/**
 * daily-article.mjs
 *
 * Run every morning at 09:00 JST via GitHub Actions.
 *
 * Flow:
 *   1. Web search: gather raw text about recent Japanese business failures
 *   2. Extract: parse candidates from the raw text in a separate Claude call
 *   3. Select: pick the most insightful case
 *   4. Deep research: gather background on the selected company
 *   5. Write: generate the full article
 *   6. Save: write Markdown to content/articles/
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles')
const COVERED_FILE = path.join(__dirname, '..', 'content', 'covered-companies.json')
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-5'

let client

// ── helpers ───────────────────────────────────────────────────────────────────

// Read covered companies from JSON (authoritative source)
function getCoveredCompanies() {
  try {
    const entries = JSON.parse(fs.readFileSync(COVERED_FILE, 'utf8'))
      .filter((e) => e && e.company && e.slug)
    const uniqueEntries = dedupeCoveredEntries(entries)
    return {
      companies: [...new Set(uniqueEntries.map((e) => String(e.company).trim()).filter(Boolean))],
      slugs: [...new Set(uniqueEntries.map((e) => String(e.slug).trim()).filter(Boolean))],
      entries: uniqueEntries,
    }
  } catch {
    // Fallback: scan article frontmatter if JSON missing
    console.warn('⚠️  covered-companies.json not found, falling back to article scan')
    const fileNames = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'))
    const companies = []
    const slugs = []
    for (const fileName of fileNames) {
      const slugMatch = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
      if (slugMatch) slugs.push(slugMatch[1])
      try {
        const { data } = matter(fs.readFileSync(path.join(ARTICLES_DIR, fileName), 'utf8'))
        if (data.company) companies.push(String(data.company).trim())
      } catch {}
    }
    return { companies: [...new Set(companies)], slugs: [...new Set(slugs)], entries: [] }
  }
}

// Append a newly covered company to the JSON log
function appendCoveredCompany(company, slug, ceo, dateStr) {
  let entries = []
  try {
    entries = JSON.parse(fs.readFileSync(COVERED_FILE, 'utf8'))
  } catch {}
  const nextEntries = dedupeCoveredEntries([
    ...entries,
    { company, slug, ceo: ceo || '', date: dateStr },
  ])
  fs.writeFileSync(COVERED_FILE, JSON.stringify(nextEntries, null, 2) + '\n', 'utf-8')
}

// Normalize company name for loose matching (strip suffixes, whitespace)
function normalizeCompany(name) {
  return String(name ?? '')
    .toLowerCase()
    .replace(/株式会社|有限会社|合同会社|ホールディングス|ホールディング|\bHD\b|inc\.|inc|corp\.|corporation|co\.|ltd\.|limited/gi, '')
    .replace(/[\s・（）()「」\/.,、。・-]/g, '')
    .trim()
}

function normalizeSlug(slug) {
  return String(slug ?? '')
    .toLowerCase()
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/[^a-z0-9]+/g, '')
}

function dedupeCoveredEntries(entries) {
  const seen = new Set()
  const unique = []
  for (const entry of Array.isArray(entries) ? entries : []) {
    if (!entry || !entry.company || !entry.slug) continue
    const company = String(entry.company).trim()
    const slug = String(entry.slug).trim()
    const key = `${normalizeCompany(company)}:${normalizeSlug(slug)}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push({
      company,
      slug,
      ceo: entry.ceo ? String(entry.ceo).trim() : '',
      date: entry.date ? String(entry.date).trim() : '',
    })
  }
  return unique
}

// Return true if candidate company matches any already-covered company or filename slug
function isCoveredCompany(candidateName, coveredCompanies, coveredSlugs = [], candidateSlugHint = '') {
  const cand = normalizeCompany(candidateName)
  const candSlug = normalizeCompany(candidateSlugHint)

  // Check slug_hint against existing filename slugs (catches Japanese name / ASCII slug mismatches)
  if (candSlug.length >= 2) {
    const isSlugCovered = coveredSlugs.some((slug) => {
      const s = normalizeSlug(slug)
      return s.includes(candSlug) || candSlug.includes(s)
    })
    if (isSlugCovered) return true
  }

  if (cand.length < 2) return false
  return coveredCompanies.some((covered) => {
    const cov = normalizeCompany(covered)
    if (cov.length < 2) return false
    return cov.includes(cand) || cand.includes(cov)
  })
}

// Return true if an article for the given date already exists
function articleExistsForDate(dateStr) {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'))
  return files.some((f) => f.startsWith(dateStr))
}

function todayJST() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

function slugify(date, company) {
  // Transliterate common Japanese company names to ASCII where possible
  const ascii = company
    .replace(/[ぁ-ん]/g, '')
    .replace(/[ァ-ン]/g, '')
    .replace(/[一-鿿]/g, '')
    .replace(/[^\w-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'article'
  return `${date}-${ascii}`
}

// Extract all text content from a Claude response (skips tool_use blocks)
function extractText(response) {
  return response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim()
}

// Parse the first JSON array found in a string
function parseJsonArray(text) {
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start === -1 || end === -1) return null
  try {
    return JSON.parse(text.slice(start, end + 1))
  } catch {
    return null
  }
}

function buildCoveredInstruction() {
  const { entries, companies: coveredCompanies } = getCoveredCompanies()
  const coveredList = entries.length > 0
    ? entries.map((e) => `・${e.company}（スラッグ: ${e.slug}${e.ceo ? `、代表者: ${e.ceo}` : ''}）`).join('\n')
    : coveredCompanies.map((c) => `・${c}`).join('\n')

  return `【重要】以下の企業はすでに記事化済みです。日本語名・英語名・略称・スラッグ・代表者名 のいずれかが一致または類似する企業は必ず除外してください（例: "オルツ" と "ALT Inc." は同一企業）：
${coveredList}`
}

const jsonFormat = `[
  {
    "company": "企業名（日本語）",
    "slug_hint": "企業名のローマ字または英語（例: softbank, sony, toyota）",
    "event": "何が起きたか（1行、日本語）",
    "year": 2025,
    "category": "DX失敗",
    "why_interesting": "なぜ深い学びがあるか（1〜2文）"
  }
]`

// Call Claude expecting a JSON array back, retrying on truncation/parse failure
async function requestCandidateArray(prompt, label, attempts = 2) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })
    const candidates = parseJsonArray(extractText(response))
    if (candidates && candidates.length > 0) return candidates
    console.warn(
      `⚠️  ${label}: attempt ${attempt}/${attempts} returned no parseable JSON array (stop_reason: ${response.stop_reason})`
    )
  }
  return null
}

async function fallbackCandidates(reason) {
  console.warn(`⚠️  ${reason}, falling back to Claude knowledge-based selection`)
  const fallback = await requestCandidateArray(
    `${buildCoveredInstruction()}

上記以外の、最近（2023〜2026年）の日本の経営失敗事例を8件、以下のJSON配列形式だけで返してください。
誰もが知る有名事例よりも、まだ広く知られていない中堅企業・スタートアップ・老舗企業の事例を優先してください：
${jsonFormat}

categoryは以下から選んでください：
DX失敗 / 新規事業失敗 / 経営判断 / 財務・M&A / コーポレートガバナンス / 組織・文化 / 急成長の罠`,
    'Fallback'
  )
  if (fallback) {
    console.log(`   Fallback extracted ${fallback.length} candidates`)
    return fallback
  }
  throw new Error('Failed to extract any candidates even with fallback. Aborting.')
}

// ── Step 1: web search ────────────────────────────────────────────────────────

// Rotate search keyword sets by day of month so the same famous
// (already-covered) cases don't dominate the results every day
const SEARCH_KEYWORD_SETS = [
  ['日本企業 事業撤退 2025 2026', '日本 倒産 大企業 2025 2026', '日本企業 経営失敗 事例', '日本企業 不正 スキャンダル 2025'],
  ['スタートアップ 倒産 破産 2025 2026', 'ベンチャー 資金調達 失敗 撤退', 'サービス終了 事業終了 2025 2026', '上場廃止 経営不振 2025'],
  ['民事再生 中堅企業 2025 2026', '老舗企業 廃業 倒産 2025', '地方企業 経営破綻 2025', '帝国データバンク 倒産 速報'],
  ['新規事業 失敗 撤退 日本企業', 'M&A 減損 失敗 2025 2026', '不祥事 ガバナンス 日本 2025 2026', '希望退職 業績悪化 日本 2025'],
]

async function fetchNewsRaw() {
  console.log('🔍  Step 1: web search for recent Japanese business failures...')

  const keywords = SEARCH_KEYWORD_SETS[new Date().getDate() % SEARCH_KEYWORD_SETS.length]
  const { companies: coveredCompanies } = getCoveredCompanies()

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }],
    messages: [
      {
        role: 'user',
        content: `以下のキーワードで日本のビジネスニュースを検索し、最近（2024〜2026年）の経営失敗・事業撤退・倒産・M&A失敗・不正会計・コーポレートガバナンス問題の具体的な事例を3〜5件探してください。

検索してほしいキーワード：
${keywords.map((k, i) => `${i + 1}. 「${k}」`).join('\n')}

ただし、以下の企業はすでに記事化済みなので対象から除外し、それ以外の事例を探してください：
${coveredCompanies.join('、')}

見つかった事例について、企業名・何が起きたか・発生年・カテゴリを自由な文章で教えてください。JSON形式でなくてかまいません。`,
      },
    ],
  })

  return extractText(response)
}

// ── Step 2: extract candidates from raw text ──────────────────────────────────

async function extractCandidates(rawText) {
  console.log('📋  Step 2: extracting structured candidates...')

  const candidates = await requestCandidateArray(
    `以下のテキストから、日本の経営失敗事例を抽出してJSON配列として返してください。
テキストに具体的な事例がない場合は、あなたの知識から最近（2023〜2026年）の代表的な日本の経営失敗を3件挙げてください。

${buildCoveredInstruction()}

テキスト：
${rawText}

必ずこの形式のJSON配列だけを返してください（他の文章は不要）：
${jsonFormat}

categoryは以下から選んでください：
DX失敗 / 新規事業失敗 / 経営判断 / 財務・M&A / コーポレートガバナンス / 組織・文化 / 急成長の罠`,
    'Extraction'
  )

  if (candidates) {
    console.log(`   Extracted ${candidates.length} candidates`)
    return candidates
  }

  return fallbackCandidates('Extraction failed')
}

// ── Step 3: select best case ──────────────────────────────────────────────────

async function selectBestCase(candidates) {
  console.log('🎯  Step 3: selecting the most insightful case...')

  const { companies: coveredCompanies, slugs: coveredSlugs } = getCoveredCompanies()

  if (candidates.length === 1) {
    if (isCoveredCompany(candidates[0].company, coveredCompanies, coveredSlugs, candidates[0].slug_hint || '')) {
      return null
    }
    return candidates[0]
  }

  // Exclude companies already covered in existing articles (company-name and slug-based)
  const novel = candidates.filter(
    (c) => !isCoveredCompany(c.company || '', coveredCompanies, coveredSlugs, c.slug_hint || '')
  )

  if (novel.length === 0) {
    return null
  }
  const pool = novel

  console.log(`   Filtered ${candidates.length - pool.length} already-covered candidates. Pool: ${pool.length}`)

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 5,
    messages: [
      {
        role: 'user',
        content: `次の経営失敗候補から、経営者・起業家・学生に最も深い学びを与える1件を選んでインデックス番号（0始まり）だけ返してください。

${pool.map((c, i) => `${i}: ${c.company} — ${c.event} (${c.category})`).join('\n')}

数字だけ（例: 0）`,
      },
    ],
  })

  const idx = parseInt(extractText(response).trim()) || 0
  return pool[Math.min(idx, pool.length - 1)]
}

// ── Step 4: deep research ─────────────────────────────────────────────────────

async function deepResearch(selected) {
  console.log(`📚  Step 4: deep research on ${selected.company}...`)

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 5000,
    tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 8 }],
    messages: [
      {
        role: 'user',
        content: `「${selected.company}」の次の事件についてディープリサーチしてください：${selected.event}

以下の項目を徹底的に調査してください：
1. 企業の歴史と全盛期（具体的な数字・年代）
2. 失敗に至るタイムライン（日付・金額・関係者名）
3. 経営陣の主要な意思決定とその背景
4. 財務データ（売上・利益・負債の推移）
5. 市場環境・競合状況
6. 組織文化・ガバナンス構造
7. 海外の類似失敗事例（具体的な企業名）

調査後、以下のJSON形式で返してください（JSONの前後に余分な文章は不要）：
{
  "company_full": "正式企業名",
  "founders": ["創業者名"],
  "peak_facts": ["具体的な数字を含む事実1", "事実2"],
  "timeline": [{"date": "YYYY-MM", "event": "出来事"}],
  "financial_data": {"peak_revenue": "売上", "debt_at_failure": "負債"},
  "key_decisions": ["重要な意思決定1", "意思決定2"],
  "root_causes": {
    "market": "市場要因",
    "management": "経営要因",
    "financial": "財務要因",
    "organization": "組織要因",
    "external": "外部要因"
  },
  "ceo_perspective": "当時のCEO視点からの意思決定の論理（200字）",
  "global_comparisons": ["海外事例1（企業名と概要）", "海外事例2"],
  "status": "倒産",
  "tags": ["タグ1", "タグ2", "タグ3", "タグ4", "タグ5"]
}`,
      },
    ],
  })

  const text = extractText(response)

  // Try to extract JSON object
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(text.slice(start, end + 1))
    } catch {
      // Return raw text as fallback
    }
  }
  return { raw: text }
}

// ── Step 5: write article ─────────────────────────────────────────────────────

async function writeArticle(selected, research, dateStr) {
  console.log('✍️   Step 5: writing the article...')

  const researchSummary = research.raw
    ? research.raw.slice(0, 3000)
    : JSON.stringify(research, null, 2).slice(0, 3000)

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content: `以下のリサーチ情報をもとに、Keiei.RIPのための深い経営インサイト記事をMarkdown形式で書いてください。

## 事例
企業名: ${selected.company}
出来事: ${selected.event}
カテゴリ: ${selected.category}
発生年: ${selected.year}

## リサーチデータ
${researchSummary}

## 厳守するフォーマット

まず以下のfrontmatterから書き始めてください（\`\`\`コードブロックなし）：
---
title: >-
  インパクトのある記事タイトル（30字以内）
company: >-
  ${selected.company}
category: ${selected.category}
year: ${selected.year}
status: >-
  ${research.status || '経営危機'}
date: "${dateStr}"
description: >-
  記事の2〜3文の要約（2〜3文）
tags: ${JSON.stringify(research.tags || ['経営', '失敗', '教訓'])}
---

その後、以下の見出しで本文を書いてください：

## TL;DR
（4〜5個の箇条書き）

## 企業概要と全盛期
（500〜700字、具体的な数字を含む）

## 何が起きたか
（600〜800字、タイムライン形式で）

## 失敗の本質的原因

### 市場・競合環境
### 経営判断と意思決定
### 財務・資金構造
### 組織と文化
### 外部環境・規制

## 経営者の意思決定を再構築する
（600〜800字、批判でなく共感的に）

## 海外類似事例との比較
（400〜600字）

## 経営者・起業家へのインサイト
（4〜5個の具体的で反直感的な教訓）

## あなたが経営者だったら？
（2〜3個の問い）

記事全体3,000字以上で書いてください。`,
      },
    ],
  })

  return extractText(response)
}

// ── Step 6: save article ──────────────────────────────────────────────────────

function saveArticle(content, slug, company, ceo, dateStr) {
  // Ensure content starts with frontmatter (strip any preamble)
  const fmStart = content.indexOf('---')
  const cleaned = fmStart > 0 ? content.slice(fmStart) : content

  // Validate frontmatter parses cleanly before writing
  try {
    matter(cleaned)
  } catch (err) {
    throw new Error(`Generated article has invalid YAML frontmatter: ${err.message}\n\nRaw content:\n${cleaned.slice(0, 500)}`)
  }

  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, cleaned, 'utf-8')
  console.log(`✅  Saved: ${filePath}`)

  // Record in covered-companies.json so future runs know this company is taken
  appendCoveredCompany(company, slug, ceo, dateStr)
  console.log(`📋  Recorded "${company}" in covered-companies.json`)

  return filePath
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌅  Keiei.RIP Daily Article Generator')
  const dateStr = todayJST()
  console.log(`📅  Date: ${dateStr}\n`)

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Missing ANTHROPIC_API_KEY environment variable.')
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 5 })

    // Guard: skip if an article for today already exists (prevents double-run)
    if (articleExistsForDate(dateStr)) {
      console.log(`ℹ️  Article for ${dateStr} already exists. Skipping.`)
      process.exit(0)
    }

    // 1. Web search (free-form text)
    const rawNews = await fetchNewsRaw()

    // 2. Extract structured candidates
    let candidates = await extractCandidates(rawNews)

    // 3. Select best case
    let selected = await selectBestCase(candidates)
    if (!selected) {
      candidates = await fallbackCandidates('All candidates are already covered')
      selected = await selectBestCase(candidates)
    }
    if (!selected) {
      throw new Error('Fallback candidates were also already covered. Aborting to avoid duplicate coverage.')
    }
    console.log(`   ✓ Selected: ${selected.company} — ${selected.event}`)

    // 4. Deep research
    const research = await deepResearch(selected)

    // 5. Write article
    const content = await writeArticle(selected, research, dateStr)

    // 6. Save
    const slug = slugify(dateStr, selected.slug_hint || selected.company)
    const ceo = Array.isArray(research.founders) && research.founders.length > 0 ? research.founders[0] : ''
    const filePath = saveArticle(content, slug, selected.company, ceo, dateStr)

    console.log(`\n🎉  Done! Saved to: ${filePath}`)
  } catch (err) {
    console.error('❌  Fatal error:', err)
    process.exit(1)
  }
}

main()
