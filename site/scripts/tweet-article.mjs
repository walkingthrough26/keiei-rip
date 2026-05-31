/**
 * tweet-article.mjs
 *
 * Post a new article to X (Twitter).
 * Usage: node scripts/tweet-article.mjs <slug>
 *
 * Required env vars:
 *   X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
 */

import { TwitterApi } from 'twitter-api-v2'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles')

const slug = (process.argv[2] || '').replace(/\.md$/, '')
if (!slug) {
  console.error('Usage: node scripts/tweet-article.mjs <slug>')
  process.exit(1)
}
if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
  console.error('Invalid slug. Pass a content/articles filename without path separators.')
  process.exit(1)
}

const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
if (!fs.existsSync(filePath)) {
  console.error(`Article not found: ${filePath}`)
  process.exit(1)
}

const { data } = matter(fs.readFileSync(filePath, 'utf8'))

const title = String(data.title ?? '').trim()
const company = String(data.company ?? '').trim()
const description = String(data.description ?? '').trim()
if (!title || !company || !description) {
  console.error(`Article frontmatter is missing title, company, or description: ${filePath}`)
  process.exit(1)
}
const articleUrl = `https://keiei.rip/articles/${slug}`

// First sentence of description
const firstSentence = (description.includes('。') ? `${description.split('。')[0]}。` : description).slice(0, 80)

// Build tweet (max 280 chars — URL counts as 23 chars on X)
const hashtags = '#経営 #起業 #ビジネス'
const body = `【今日の経営失敗】\n${title}\n\n${firstSentence}\n\n${articleUrl}\n\n${hashtags}`

// Trim if somehow over limit
const tweet = body.length <= 280 ? body : body.slice(0, 277) + '…'

console.log('📝  Tweet preview:')
console.log('─'.repeat(40))
console.log(tweet)
console.log('─'.repeat(40))

const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET } = process.env

if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_SECRET) {
  console.error('❌  Missing X API credentials. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET.')
  process.exit(1)
}

const client = new TwitterApi({
  appKey: X_API_KEY,
  appSecret: X_API_SECRET,
  accessToken: X_ACCESS_TOKEN,
  accessSecret: X_ACCESS_SECRET,
})

try {
  const { data: tweetData } = await client.v2.tweet(tweet)
  console.log(`✅  Posted to X: https://x.com/i/web/status/${tweetData.id}`)
} catch (err) {
  console.error('❌  Failed to post tweet:', err.message ?? err)
  process.exit(1)
}
