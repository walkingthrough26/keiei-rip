import { getAllArticles } from '@/lib/articles'
import { MemorialCard, SectionLabel, StatPlaque } from '@/components/ui'

export default function Home() {
  const articles = getAllArticles() // newest-first
  const total = articles.length
  const featured = articles[0]
  const rest = articles.slice(1)

  const distinctCategories = new Set(articles.map((a) => a.category)).size
  const years = articles.map((a) => a.year)
  const oldestYear = Math.min(...years)
  const newestYear = Math.max(...years)

  // grave numbers: earliest = 0001, newest gets the highest
  const numberFor = (idx: number) => String(total - idx).padStart(4, '0')

  return (
    <>
      {/* —— Hero —— */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '88px 24px 64px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            color: 'var(--shu-500)',
            marginBottom: 28,
          }}
        >
          経営の墓場 — An Archive of Fallen Businesses
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 76px)',
            lineHeight: 1.18,
            letterSpacing: '-.02em',
            color: 'var(--sumi)',
            margin: 0,
            maxWidth: '16em',
          }}
        >
          倒れた事業に、
          <br />
          弔いと、敬意を。
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
            fontSize: 20,
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            maxWidth: '34em',
            marginTop: 28,
          }}
        >
          ここは、潰えた事業の墓場です。失敗は、挑んだ者にしか訪れない。
          日本の象徴的な経営の蹉跌を毎朝ひとつ、弔辞とともに刻んでいます。
          敗れてなお前を向いた事業者たちへ——次の挑戦者のために。
        </p>
      </section>

      {/* —— Stats band (ink) —— */}
      <section style={{ background: 'var(--sumi)' }}>
        <div
          style={{
            maxWidth: 'var(--container)',
            margin: '0 auto',
            padding: '52px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 40,
          }}
        >
          <StatPlaque onDark accent value={total} unit="基" label="埋葬された事業" />
          <StatPlaque onDark value={distinctCategories} unit="類型" label="失敗のかたち" />
          <StatPlaque onDark value={oldestYear} label="最古の記録" sub="EARLIEST" />
          <StatPlaque onDark value={newestYear} label="最新の記録" sub="LATEST" />
        </div>
      </section>

      {/* —— Featured monument —— */}
      {featured && (
        <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 24px 0' }}>
          <SectionLabel number="00" kicker="This Month's Grave" title="今月の墓標" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
              gap: 40,
              marginTop: 32,
              alignItems: 'start',
            }}
          >
            <MemorialCard
              variant="monument"
              href={`/articles/${featured.slug}`}
              number={numberFor(0)}
              company={featured.company}
              title={featured.title}
              year={featured.year}
              status={featured.status}
              category={featured.category}
            />
            <div style={{ paddingTop: 8 }}>
              <p
                style={{
                  fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
                  fontSize: 17,
                  lineHeight: 1.95,
                  color: 'var(--text-secondary)',
                  textWrap: 'pretty',
                }}
              >
                {featured.description}
              </p>
              <div style={{ marginTop: 24 }}>
                <a href={`/articles/${featured.slug}`} className="btn btn-secondary">
                  弔辞を読む
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* —— Archive grid —— */}
      <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '72px 24px 40px' }}>
        <SectionLabel number="01" kicker="The Archive" title="墓碑をめぐる" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
            marginTop: 36,
          }}
        >
          {rest.map((article, i) => (
            <MemorialCard
              key={article.slug}
              href={`/articles/${article.slug}`}
              number={numberFor(i + 1)}
              company={article.company}
              title={article.title}
              year={article.year}
              status={article.status}
              category={article.category}
              description={article.description}
            />
          ))}
        </div>
      </section>
    </>
  )
}
