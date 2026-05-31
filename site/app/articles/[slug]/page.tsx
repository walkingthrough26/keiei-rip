import { getAllArticles, getArticle, getCategoryColor, getRelatedArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(props: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getArticle(slug)
  if (!article) return {}
  const url = `https://keiei.rip/articles/${slug}`
  const ogImageUrl = `https://keiei.rip/og?title=${encodeURIComponent(article.title)}&company=${encodeURIComponent(article.company)}&category=${encodeURIComponent(article.category)}&year=${encodeURIComponent(String(article.year))}`
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
  }
}

export default async function ArticlePage(props: PageProps<'/articles/[slug]'>) {
  const { slug } = await props.params
  const article = await getArticle(slug)

  if (!article) notFound()

  const related = getRelatedArticles(slug, article.category)

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

      {/* Like */}
      <div className="mt-12 flex justify-center">
        <LikeButton slug={slug} />
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-20 pt-10 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-sans mb-6">
            同じカテゴリの記事
          </h2>
          <div className="flex flex-col gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/articles/${r.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
              >
                <span className="text-xs text-gray-400 font-sans">{r.company} · {r.year}年</span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-red-700 transition-colors font-sans">
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer nav */}
      <div className="mt-10 pt-10 border-t border-gray-200">
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
