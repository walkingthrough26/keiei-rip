import { getAllArticles, getCategoryColor } from '@/lib/articles'

function ogUrl(title: string, company: string, category: string, year: number) {
  return `/og?title=${encodeURIComponent(title)}&company=${encodeURIComponent(company)}&category=${encodeURIComponent(category)}&year=${encodeURIComponent(String(year))}`
}

export default function Home() {
  const articles = getAllArticles()
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20 border-b border-gray-200 pb-16">
        <p className="text-xs uppercase tracking-widest text-red-700 font-sans mb-4">
          経営の失敗から学ぶ深いインサイト
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900">
          企業は死んでも、<br />
          <span className="text-red-700">教訓は生き続ける。</span>
        </h1>
        <p className="text-lg text-gray-500 font-sans leading-relaxed max-w-2xl">
          日本の象徴的な事業の失敗・経営判断のミス・M&A の蹉跌を毎朝深くリサーチ。
          経営者・起業家・学生が次の挑戦で活かせる、生きた知識を届けます。
        </p>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-6">最新記事</p>
          <a href={`/articles/${featured.slug}`} className="group block">
            <div className="border border-gray-200 bg-white hover:border-red-300 transition-colors overflow-hidden">
              {/* OG thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ogUrl(featured.title, featured.company, featured.category, featured.year)}
                alt={featured.title}
                width={1200}
                height={630}
                className="w-full h-auto"
              />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs px-2 py-1 font-sans font-medium rounded ${getCategoryColor(featured.category)}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400 font-sans">{featured.year}年</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 font-sans rounded">
                    {featured.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 font-sans">
                  <time>{featured.date}</time>
                  <span>·</span>
                  <span>{featured.company}</span>
                </div>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Article list */}
      <section>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-6">過去の記事</p>
        <div className="divide-y divide-gray-100">
          {rest.map((article) => (
            <a
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex items-center gap-5 py-5 hover:opacity-80 transition-opacity"
            >
              {/* Thumbnail — container div enforces hard 120×63 clip */}
              <div style={{ width: 120, height: 63, flexShrink: 0, overflow: 'hidden', borderRadius: 4, background: '#e5e7eb' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogUrl(article.title, article.company, article.category, article.year)}
                  alt=""
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 font-sans font-medium rounded ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 font-sans">{article.year}年</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-snug mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 font-sans line-clamp-1 leading-relaxed">
                  {article.description}
                </p>
              </div>
              {/* Meta */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 font-sans rounded whitespace-nowrap">
                  {article.status}
                </span>
                <time className="text-xs text-gray-400 font-sans whitespace-nowrap">{article.date}</time>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
