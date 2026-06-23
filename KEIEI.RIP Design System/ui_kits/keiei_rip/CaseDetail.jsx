/* KEIEI.RIP — Case detail (one grave) */
function CaseDetail({ data, onBack }) {
  const age = data.died - data.founded;
  const stats = data.stats || [{ value: age, unit: '年', label: '営業年数' }];
  const story = data.story || [data.epitaph];
  const related = window.KEIEI_DATA.filter((d) => d.number !== data.number && !d.featured).slice(0, 3);

  return (
    <main>
      {/* —— Case header (ink band) —— */}
      <section style={{ background: 'var(--sumi)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 40px 56px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.14em', color: 'var(--ink-300)', textTransform: 'uppercase', marginBottom: 40 }}>
            ← Back to Archive
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.14em', color: 'var(--shu-400)' }}>NO. {data.number}</span>
            <span style={{ height: 1, flex: 1, background: 'var(--ink-700)' }}></span>
            <Tag variant="seal">{data.cause}</Tag>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.18, letterSpacing: '-.02em', margin: 0 }}>{data.name}</h1>
          {data.nameLatin && <div style={{ fontFamily: 'var(--font-latin)', fontStyle: 'italic', fontSize: 19, color: 'var(--ink-300)', marginTop: 10 }}>{data.nameLatin}</div>}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 28 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontVariantNumeric: 'tabular-nums' }}>{data.founded} <span style={{ color: 'var(--shu-400)' }}>—</span> {data.died}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-300)' }}>享年 {age}年 · {data.industry}</span>
          </div>
        </div>
      </section>

      {/* —— Stats —— */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '48px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 36 }}>
          {stats.map((s, i) => <StatPlaque key={i} {...s} />)}
        </div>
      </section>

      {/* —— Story —— */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '56px 40px 0' }}>
        <SectionLabel kicker="Obituary" title="弔辞" />
        <div style={{ marginTop: 28 }}>
          {story.map((p, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 2.0, color: 'var(--text-primary)', marginBottom: 24, textWrap: 'pretty' }}>{p}</p>
          ))}
        </div>
        {data.lastWords && (
          <div style={{ margin: '40px 0' }}>
            <Quote cite={data.lastWords.cite} source={data.lastWords.source}>{data.lastWords.text}</Quote>
          </div>
        )}
      </article>

      {/* —— Related —— */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 0' }}>
        <SectionLabel number="—" kicker="Nearby Graves" title="隣の墓標" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 32 }}>
          {related.map((d) => <MemorialCard key={d.number} {...d} onClick={() => { window.scrollTo(0, 0); window.__open(d); }} />)}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
window.CaseDetail = CaseDetail;
