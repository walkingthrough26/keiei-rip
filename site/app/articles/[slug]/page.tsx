import { getAllArticles, getArticle, getRelatedArticles, getGraveNumber } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'
import { MemorialCard, SectionLabel, Tag, shortStatus } from '@/components/ui'

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
      siteName: 'KEIEI.RIP',
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

  const number = getGraveNumber(slug)
  const related = getRelatedArticles(slug, article.category)

  return (
    <>
      {/* —— Case header (ink band) —— */}
      <section style={{ background: 'var(--sumi)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '36px 24px 56px' }}>
          <Link href="/" className="ghost-link" style={{ display: 'inline-block', marginBottom: 40, color: 'var(--ink-300)' }}>
            ← Back to Archive
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, letterSpacing: '.14em', color: 'var(--shu-400)' }}>
              NO. {number}
            </span>
            <span style={{ height: 1, flex: 1, background: 'var(--ink-700)' }} />
            <Tag variant="seal">{shortStatus(article.status)}</Tag>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
              fontWeight: 900,
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              lineHeight: 1.25,
              letterSpacing: '-.02em',
              margin: 0,
              color: 'var(--paper)',
            }}
          >
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginTop: 28 }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 22, fontVariantNumeric: 'tabular-nums', color: 'var(--paper)' }}>
              没 <span style={{ color: 'var(--shu-400)' }}>—</span> {article.year}
            </span>
            <span style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: 14, color: 'var(--ink-300)' }}>
              {article.company} · {article.category}
            </span>
          </div>
        </div>
      </section>

      {/* —— Lead —— */}
      <section style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '48px 24px 0' }}>
        <p
          style={{
            fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
            fontSize: 'var(--fs-lead)',
            lineHeight: 1.95,
            color: 'var(--text-secondary)',
            textWrap: 'pretty',
            paddingBottom: 32,
            borderBottom: '1px solid var(--ink-200)',
          }}
        >
          {article.description}
        </p>
        {article.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
            {article.tags.map((tag) => (
              <Tag key={tag} variant="muted">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </section>

      {/* —— Obituary body —— */}
      <article style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '56px 24px 0' }}>
        <SectionLabel kicker="Obituary" title="弔辞" />
        <div
          className="obituary"
          style={{ marginTop: 32 }}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>

      {/* —— 献花 (like) —— */}
      <div style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '48px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <LikeButton slug={slug} />
      </div>

      {/* —— Related —— */}
      {related.length > 0 && (
        <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 24px 0' }}>
          <SectionLabel number="—" kicker="Nearby Graves" title="隣の墓標" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
              marginTop: 32,
            }}
          >
            {related.map((r) => (
              <MemorialCard
                key={r.slug}
                href={`/articles/${r.slug}`}
                number={getGraveNumber(r.slug)}
                company={r.company}
                title={r.title}
                year={r.year}
                status={r.status}
                category={r.category}
                description={r.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* —— Footer nav —— */}
      <div style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '64px 24px 0' }}>
        <Link href="/" className="ghost-link">
          ← 墓碑一覧に戻る
        </Link>
      </div>
    </>
  )
}
