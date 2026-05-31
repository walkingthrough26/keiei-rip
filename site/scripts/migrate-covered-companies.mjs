/**
 * migrate-covered-companies.mjs
 *
 * One-shot script: read all existing article frontmatter and produce
 * site/content/covered-companies.json.
 *
 * Run once:  node scripts/migrate-covered-companies.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles')
const OUTPUT_FILE = path.join(__dirname, '..', 'content', 'covered-companies.json')

const fileNames = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md')).sort()

const entries = []
for (const fileName of fileNames) {
  const slugMatch = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
  const slug = slugMatch ? slugMatch[1] : fileName.replace('.md', '')
  try {
    const { data } = matter(fs.readFileSync(path.join(ARTICLES_DIR, fileName), 'utf8'))
    const company = data.company ? String(data.company).trim() : ''
    const date = data.date ? String(data.date).trim() : ''
    if (company) {
      entries.push({ company, slug, ceo: '', date })
      console.log(`  ✓ ${date} ${company} (${slug})`)
    }
  } catch (err) {
    console.warn(`  ⚠ skipped ${fileName}: ${err.message}`)
  }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + '\n', 'utf-8')
console.log(`\n✅  Written ${entries.length} entries to ${OUTPUT_FILE}`)
