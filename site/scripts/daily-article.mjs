/**
 * daily-article.mjs
 *
 * Run every morning at 06:00 JST via GitHub Actions.
 *
 * Flow:
 *   1. Web search: collect recent Japanese business-failure news (倒産/撤退/不正/M&A失敗)
 *   2. Select: pick the most insightful case for today
 *   3. Deep research: gather background on the selected company
 *   4. Write: generate the full article using Claude
 *   5. Save: write the Markdown file to content/articles/
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-')
}

function slugify(date, company) {
  const safe = company
    .toLowerCase()
    .replace(/[^\w぀-ゟ゠-ヿ一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${date}-${safe}`
}

// ── Step 1: web search for failure news ──────────────────────────────────────

async function searchFailureNews() {
  console.log('🔍  Step 1: searching for today\'s business failure news...')

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2000,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 5,
      },
    ],
    messages: [
      {
        role: 'user',
        content: `今日の日本のビジネスニュースから、経営失敗・事業撤退・倒産・M&A失敗・不正会計・コーポレートガバナンス問題の事例を検索してください。
検索クエリ例：
- "日本 事業撤退 2025"
- "日本 倒産 企業 2025"
- "日本 経営失敗 事例 2025"
- "日本企業 不正 スキャンダル 2025"

結果から、最も深い経営インサイトが得られる事例を3件リストアップし、以下の形式でJSONとして返してください：
[
  {
    "company": "企業名",
    "event": "何が起きたか（1行）",
    "year": YYYY,
    "category": "DX失敗|新規事業失敗|経営判断|財務・M&A|コーポレートガバナンス|組織・文化|急成長の罠",
    "why_interesting": "なぜ深い学びがあるか（2-3文）"
  }
]`,
      },
    ],
  })

  // Extract text from the response
  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')

  // Try to extract JSON array
  const match = text.match(/\[[\s\S]*?\]/m)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch {
      // fall through to fallback
    }
  }

  // Fallback: return a placeholder for manual review
  console.warn('⚠️  Could not parse search results JSON, using fallback')
  return [
    {
      company: '未定',
      event: 'Web検索結果の解析に失敗',
      year: new Date().getFullYear(),
      category: '経営判断',
      why_interesting: '手動でレビューが必要です',
    },
  ]
}

// ── Step 2: select best case ──────────────────────────────────────────────────

async function selectBestCase(candidates) {
  console.log('🎯  Step 2: selecting the most insightful case...')

  if (candidates.length === 1) return candidates[0]

  const prompt = `以下の経営失敗事例の候補から、経営者・起業家・学生にとって最も深い学びが得られる1件を選んでください。

候補:
${JSON.stringify(candidates, null, 2)}

選定基準：
1. 多くの読者に普遍的に適用できる教訓があるか
2. まだ十分に語られていない視点や分析があるか
3. 経営判断の構造が明確に分析できるか
4. 海外の類似事例との比較が豊かにできるか

選んだ事例のインデックス番号（0始まり）だけを返してください。例：0`

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 10,
    messages: [{ role: 'user', content: prompt }],
  })

  const idx = parseInt(response.content[0].text.trim()) || 0
  return candidates[Math.min(idx, candidates.length - 1)]
}

// ── Step 3: deep research ─────────────────────────────────────────────────────

async function deepResearch(selectedCase) {
  console.log(`📚  Step 3: deep research on ${selectedCase.company}...`)

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4000,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 8,
      },
    ],
    messages: [
      {
        role: 'user',
        content: `${selectedCase.company}の以下の事件についてディープリサーチを行ってください。

事件の概要：${selectedCase.event}

調査すべき内容：
1. 企業の全盛期と何が優れていたか
2. 失敗に至る詳細なタイムライン（日付・金額・人物名含む）
3. 経営陣の主要な意思決定とその背景
4. 財務データ（売上・利益・負債の推移）
5. 当時の市場環境・競合状況
6. 組織文化・ガバナンス構造
7. 海外の類似事例

調査結果を詳細なJSON形式で返してください：
{
  "company_full": "正式企業名",
  "founders": ["創業者名"],
  "peak_facts": ["全盛期の事実（具体的な数字含む）"],
  "timeline": [
    {"date": "YYYY-MM", "event": "出来事"}
  ],
  "financial_data": {"peak_revenue": "数字", "debt_at_failure": "数字"},
  "key_decisions": ["重要な意思決定"],
  "root_causes": {
    "market": "市場要因",
    "management": "経営要因",
    "financial": "財務要因",
    "organization": "組織要因",
    "external": "外部要因"
  },
  "ceo_perspective": "当時のCEOの視点から見た意思決定の論理",
  "global_comparisons": ["海外類似事例1", "海外類似事例2"],
  "status": "倒産|撤退|スキャンダル|身売り|経営危機|解散",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`,
      },
    ],
  })

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')

  const match = text.match(/\{[\s\S]*\}/m)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch {
      return { raw: text }
    }
  }
  return { raw: text }
}

// ── Step 4: write article ─────────────────────────────────────────────────────

async function writeArticle(selectedCase, research, dateStr) {
  console.log('✍️   Step 4: writing the article...')

  const prompt = `以下のリサーチデータをもとに、Keiei.RIPのための深い経営インサイト記事をMarkdown形式で書いてください。

## 事例情報
${JSON.stringify({ selectedCase, research }, null, 2)}

## 記事フォーマット（厳守）

frontmatterは以下の形式で記述してください：
\`\`\`
---
title: "タイトル（30字以内、インパクトのある日本語で）"
company: "企業名"
category: ${selectedCase.category}
year: ${selectedCase.year}
status: "${research.status || '経営危機'}"
date: "${dateStr}"
description: "2-3文の説明"
tags: ${JSON.stringify(research.tags || ['経営', '失敗', '教訓'])}
---
\`\`\`

## 記事セクション

### TL;DR
- 4-5個の箇条書き。読者が30秒で核心を掴める内容

### 企業概要と全盛期
全盛期の具体的な数字、なぜ期待されたか、何が優れていたかを500-700字で

### 何が起きたか
崩壊のタイムラインを具体的な日付・数字・人物名を含めて600-800字で

### 失敗の本質的原因
#### 市場・競合環境
#### 経営判断と意思決定
#### 財務・資金構造
#### 組織と文化
#### 外部環境・規制
各200-300字で、表面的な原因ではなく構造的・本質的な原因を

### 経営者の意思決定を再構築する
当時のCEOの視点から、なぜその決断が「合理的に見えた」のかを共感的に600-800字で分析。批判ではなく理解を。

### 海外類似事例との比較
1-2件の具体的な海外事例と比較し、「日本固有の問題か」「普遍的な失敗パターンか」を400-600字で

### 経営者・起業家へのインサイト
4-5個の具体的で反直感的な教訓。プラチナ的な一般論ではなく、この事例特有の深い示唆を

### あなたが経営者だったら？
読者が自分事として考えられる問い2-3個

---
記事全体で3,000字以上の充実した内容にしてください。`

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content[0].text
}

// ── Step 5: save article ──────────────────────────────────────────────────────

function saveArticle(content, slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅  Saved: ${filePath}`)
  return filePath
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌅  Keiei.RIP Daily Article Generator')
  console.log(`📅  Date: ${today()}\n`)

  try {
    const dateStr = today()

    // 1. Search
    const candidates = await searchFailureNews()
    console.log(`   Found ${candidates.length} candidates`)

    // 2. Select
    const selected = await selectBestCase(candidates)
    console.log(`   Selected: ${selected.company} — ${selected.event}`)

    // 3. Research
    const research = await deepResearch(selected)

    // 4. Write
    const articleContent = await writeArticle(selected, research, dateStr)

    // 5. Save
    const slug = slugify(dateStr, selected.company)
    const savedPath = saveArticle(articleContent, slug)

    console.log(`\n🎉  Done! Article saved to ${savedPath}`)
    console.log('   Run `npm run build` or commit to trigger Vercel deploy.')
  } catch (err) {
    console.error('❌  Error:', err)
    process.exit(1)
  }
}

main()
