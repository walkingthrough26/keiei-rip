/* KEIEI.RIP — site header */
function SiteHeader({ onHome }) {
  const links = ['アーカイブ', '業種別', '弔辞', '寄稿する'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(244,240,231,0.88)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderBottom: '1px solid var(--ink-200)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Seal size={34} />
          <Wordmark size={26} />
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map((l, i) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: i === 0 ? 'var(--sumi)' : 'var(--ink-600)', letterSpacing: '.02em' }}>{l}</a>
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', color: 'var(--shu-500)', textTransform: 'uppercase' }}>R.I.P.</span>
        </nav>
      </div>
    </header>
  );
}
window.SiteHeader = SiteHeader;
