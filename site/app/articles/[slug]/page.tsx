import { getAllArticles, getArticle, getCategoryColor } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(props: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getArticle(slug)
  if (!article) return {}
  const url = `https://keiei.rip/articles/${slug}`
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      url,
      siteName: 'Keiei.RIP',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default async function ArticlePage(props: PageProps<'/articles/[slug]'>) {
  const { slug } = await props.params
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="mb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 font-sans transition-colors">
          ← 記事一覧
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12 pb-12 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-5">
          <span className={`text-xs px-2 py-1 font-sans font-medium rounded ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400 font-sans">{article.year}年</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 font-sans rounded">
            {article.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-gray-500 font-sans leading-relaxed">
          {article.description}
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs text-gray-400 font-sans">
          <time>{article.date}</time>
          <span>·</span>
          <span className="font-medium text-gray-600">{article.company}</span>
          {article.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <article
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        className="text-base leading-relaxed"
      />

      {/* Footer nav */}
      <div className="mt-20 pt-10 border-t border-gray-200">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-700 font-sans transition-colors"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  )
}
