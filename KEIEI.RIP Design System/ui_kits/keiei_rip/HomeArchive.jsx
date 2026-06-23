/* KEIEI.RIP — Home / Archive */
function HomeArchive({ onOpen }) {
  const data = window.KEIEI_DATA;
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const featured = data.find((d) => d.featured);
  const filters = [
    ['all', 'すべて', null], ['書店', '書店', null], ['飲食', '飲食', null],
    ['洋食', '洋食', null], ['製造', '製造', null], ['小売', '小売', null], ['IT', 'IT', null],
  ];
  let rows = data.filter((d) => !d.featured);
  if (filter !== 'all') rows = rows.filter((d) => d.industry === filter);
  if (q.trim()) rows = rows.filter((d) => (d.name + (d.industry || '') + (d.cause || '')).includes(q.trim()));
  const counts = {};
  data.forEach((d) => { counts[d.industry] = (counts[d.industry] || 0) + 1; });

  return (
    <main>
      {/* —— Hero —— */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '88px 40px 64px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--shu-500)', marginBottom: 28 }}>
          経営の墓場 — An Archive of Fallen Businesses
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.18, letterSpacing: '-.02em', color: 'var(--sumi)', margin: 0, maxWidth: '16em' }}>
          倒れた事業に、<br />弔いと、敬意を。
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '34em', marginTop: 28 }}>
          ここは、潰えた事業の墓場です。失敗は、挑んだ者にしか訪れない。敗れてなお前を向いた事業者たちの記録を、ひとつずつ刻んでいます。
        </p>
        <div style={{ maxWidth: 560, marginTop: 40 }}>
          <SearchField value={q} onChange={setQ} size="lg" />
        </div>
      </section>

      {/* —— Stats band (ink) —— */}
      <section style={{ background: 'var(--sumi)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          <StatPlaque onDark value={data.length} unit="基" label="埋葬された事業" accent />
          <StatPlaque onDark value="49" unit="年" label="最も長く生きた事業" />
          <StatPlaque onDark value="12" unit="業種" label="眠る業種" />
          <StatPlaque onDark value="1923" label="最古の創業年" sub="EST." />
        </div>
      </section>

      {/* —— Featured monument —— */}
      {featured && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 0' }}>
          <SectionLabel number="00" kicker="This Month's Grave" title="今月の墓標" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, marginTop: 32, alignItems: 'start' }}>
            <MemorialCard variant="monument" {...featured} onClick={() => onOpen(featured)} />
            <div style={{ paddingTop: 8 }}>
              <Quote cite="二代目店主" source="閉店の日に">{featured.lastWords.text}</Quote>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.95, color: 'var(--text-secondary)', marginTop: 28 }}>
                {featured.story[0]}
              </p>
              <div style={{ marginTop: 24 }}>
                <Button variant="secondary" onClick={() => onOpen(featured)}>弔辞を読む</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* —— Archive grid —— */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 40px' }}>
        <SectionLabel number="01" kicker="The Archive" title="墓碑をめぐる" />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '28px 0 36px' }}>
          {filters.map(([k, label]) => (
            <FilterChip key={k} active={filter === k} count={k === 'all' ? data.length - 1 : counts[k]} onClick={() => setFilter(k)}>{label}</FilterChip>
          ))}
        </div>
        {rows.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {rows.map((d) => <MemorialCard key={d.number} {...d} onClick={() => onOpen(d)} />)}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-muted)', padding: '40px 0' }}>該当する墓碑は見つかりませんでした。</p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--ink-200)', marginTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Seal size={30} char="卒" outline />
          <Wordmark size={22} />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          REST IN PEACE, AMBITION. — © KEIEI.RIP
        </p>
      </div>
    </footer>
  );
}
window.HomeArchive = HomeArchive;
window.SiteFooter = SiteFooter;
