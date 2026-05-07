import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export type ArticleCategory =
  | '新規事業失敗'
  | 'DX失敗'
  | '経営判断'
  | '財務・M&A'
  | 'コーポレートガバナンス'
  | '組織・文化'
  | '急成長の罠'

export type ArticleStatus =
  | '倒産'
  | '撤退'
  | 'スキャンダル'
  | '身売り'
  | '経営危機'
  | '解散'

export interface ArticleMeta {
  slug: string
  title: string
  company: string
  category: ArticleCategory
  year: number
  status: ArticleStatus
  date: string
  description: string
  tags: string[]
}

export interface Article extends ArticleMeta {
  contentHtml: string
}

export function getAllArticles(): ArticleMeta[] {
  const fileNames = fs.readdirSync(articlesDirectory)

  const articles = fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        company: data.company,
        category: data.category,
        year: data.year,
        status: data.status,
        date: data.date,
        description: data.description,
        tags: data.tags ?? [],
      } as ArticleMeta
    })

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getArticle(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    company: data.company,
    category: data.category,
    year: data.year,
    status: data.status,
    date: data.date,
    description: data.description,
    tags: data.tags ?? [],
    contentHtml,
  }
}

export function getCategoryColor(category: ArticleCategory): string {
  const colors: Record<ArticleCategory, string> = {
    '新規事業失敗': 'bg-orange-100 text-orange-800',
    'DX失敗': 'bg-blue-100 text-blue-800',
    '経営判断': 'bg-red-100 text-red-800',
    '財務・M&A': 'bg-purple-100 text-purple-800',
    'コーポレートガバナンス': 'bg-gray-200 text-gray-800',
    '組織・文化': 'bg-green-100 text-green-800',
    '急成長の罠': 'bg-yellow-100 text-yellow-800',
  }
  return colors[category] ?? 'bg-gray-100 text-gray-700'
}

export function getStatusLabel(status: ArticleStatus): string {
  return status
}
