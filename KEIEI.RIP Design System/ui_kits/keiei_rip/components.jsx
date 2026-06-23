/* KEIEI.RIP UI kit — local primitives (mirror the DS components, token-driven) */
const { useState } = React;

function Seal({ size = 40, char = '経', outline = false }) {
  return (
    <span style={{
      width: size, height: size, flex: 'none', display: 'grid', placeItems: 'center',
      borderRadius: 'var(--radius-seal)',
      background: outline ? 'transparent' : 'var(--shu-500)',
      border: outline ? '2.5px solid var(--shu-500)' : 'none',
      boxShadow: outline ? 'none' : 'var(--shadow-seal)',
    }}>
      <b style={{ fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1, fontSize: size * 0.56, color: outline ? 'var(--shu-500)' : 'var(--paper)' }}>{char}</b>
    </span>
  );
}

function Wordmark({ size = 26, onDark = false }) {
  return (
    <span style={{ fontFamily: 'var(--font-latin)', fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: '.005em', color: onDark ? 'var(--paper)' : 'var(--sumi)', display: 'inline-flex', alignItems: 'baseline' }}>
      KEIEI<span style={{ color: onDark ? 'var(--shu-400)' : 'var(--shu-500)' }}>.RIP</span>
    </span>
  );
}

function Button({ variant = 'primary', size = 'md', children, style, ...rest }) {
  const [h, setH] = useState(false), [p, setP] = useState(false);
  const sizes = { sm: { padding: '8px 16px', fontSize: 13 }, md: { padding: '12px 24px', fontSize: 15 }, lg: { padding: '16px 32px', fontSize: 17 } };
  const pal = {
    primary: { base: { background: 'var(--shu-500)', color: 'var(--paper)', border: '1.5px solid var(--shu-500)' }, hover: { background: 'var(--shu-600)', borderColor: 'var(--shu-600)' }, press: { background: 'var(--shu-700)' } },
    secondary: { base: { background: 'transparent', color: 'var(--sumi)', border: '1.5px solid var(--sumi)' }, hover: { background: 'var(--sumi)', color: 'var(--paper)' }, press: {} },
    ghost: { base: { background: 'transparent', color: 'var(--sumi)', border: '1.5px solid transparent' }, hover: { color: 'var(--shu-500)' }, press: {} },
  }[variant];
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }} onMouseDown={() => setP(true)} onMouseUp={() => setP(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '.02em', lineHeight: 1, borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all var(--dur-fast) var(--ease-standard)', transform: p ? 'translateY(1px)' : 'none', ...sizes[size], ...pal.base, ...(h ? pal.hover : null), ...(p ? pal.press : null), ...style }} {...rest}>
      {children}
    </button>
  );
}

function Tag({ variant = 'default', children, style }) {
  const v = {
    default: { background: 'transparent', color: 'var(--ink-600)', border: '1px solid var(--ink-300)' },
    solid: { background: 'var(--sumi)', color: 'var(--paper)', border: '1px solid var(--sumi)' },
    accent: { background: 'transparent', color: 'var(--shu-600)', border: '1px solid var(--shu-500)' },
    seal: { background: 'var(--shu-500)', color: 'var(--paper)', border: '1px solid var(--shu-500)' },
    muted: { background: 'var(--paper-deep)', color: 'var(--ink-500)', border: '1px solid transparent' },
  }[variant];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '.02em', lineHeight: 1, padding: '5px 10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap', ...v, ...style }}>{children}</span>;
}

function FilterChip({ active, count, children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, lineHeight: 1, padding: '9px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all var(--dur-fast) var(--ease-standard)',
        border: `1px solid ${active ? 'var(--sumi)' : (h ? 'var(--sumi)' : 'var(--ink-300)')}`, background: active ? 'var(--sumi)' : 'transparent', color: active ? 'var(--paper)' : (h ? 'var(--sumi)' : 'var(--ink-600)') }}>
      {children}{count != null && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: active ? 'var(--shu-400)' : 'var(--text-muted)' }}>{count}</span>}
    </button>
  );
}

function SearchField({ value, onChange, placeholder = '社名・業種で墓場を探す', size = 'md' }) {
  const [f, setF] = useState(false);
  const fs = size === 'lg' ? 22 : 17, pad = size === 'lg' ? '14px 0' : '10px 0';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1.5px solid ${f ? 'var(--shu-500)' : 'var(--sumi)'}`, transition: 'border-color var(--dur-base)' }}>
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: f ? 'var(--shu-500)' : 'var(--text-muted)' }}>⌕</span>
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-serif)', fontSize: fs, color: 'var(--sumi)', padding: pad, minWidth: 0 }} />
    </div>
  );
}

function SectionLabel({ kicker, title, number, align = 'left', onDark = false }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)', muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)', rule = onDark ? 'var(--ink-700)' : 'var(--sumi)';
  return (
    <div style={{ textAlign: align }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--shu-500)', marginBottom: 10 }}>
        {number && <span style={{ color: muted }}>{number}</span>}{kicker && <span>{kicker}</span>}
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1.15, letterSpacing: '-.01em', color: ink, margin: 0, paddingBottom: 16, borderBottom: `1.5px solid ${rule}` }}>{title}</h2>
    </div>
  );
}

function Quote({ children, cite, source, onDark = false }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)', muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  return (
    <figure style={{ margin: 0, paddingLeft: 24, borderLeft: '3px solid var(--shu-500)' }}>
      <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24, lineHeight: 1.6, letterSpacing: '-.01em', color: ink, textWrap: 'pretty' }}>{children}</blockquote>
      {(cite || source) && <figcaption style={{ marginTop: 16, fontFamily: 'var(--font-sans)', fontSize: 14, color: muted }}>
        {cite && <span style={{ color: ink, fontWeight: 600 }}>{cite}</span>}{cite && source && <span style={{ margin: '0 8px', color: 'var(--shu-500)' }}>—</span>}{source && <span>{source}</span>}
      </figcaption>}
    </figure>
  );
}

function StatPlaque({ value, unit, label, sub, align = 'left', onDark = false, accent = false }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)', muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  return (
    <div style={{ textAlign: align }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 40, lineHeight: 1, letterSpacing: '-.02em', color: accent ? 'var(--shu-500)' : ink, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: muted }}>{unit}</span>}
      </div>
      <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${onDark ? 'var(--ink-700)' : 'var(--ink-200)'}`, fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: ink }}>{label}</div>
      {sub && <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.06em', color: muted }}>{sub}</div>}
    </div>
  );
}

function MemorialCard({ name, nameLatin, industry, founded, died, cause, epitaph, number, variant = 'stone', onClick }) {
  const [h, setH] = useState(false);
  const lifespan = (founded != null && died != null) ? `${founded} — ${died}` : null;
  const age = (founded != null && died != null) ? died - founded : null;
  const click = { onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), style: { cursor: 'pointer' } };

  if (variant === 'index') {
    return (
      <div {...click} style={{ ...click.style, display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 20, padding: '18px 8px', borderBottom: '1px solid var(--ink-200)', background: h ? 'var(--paper-raised)' : 'transparent', transition: 'background var(--dur-fast)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{number || '—'}</span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: h ? 'var(--shu-600)' : 'var(--sumi)', transition: 'color var(--dur-fast)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          {lifespan && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{lifespan}</span>}
        </span>
        {cause && <Tag variant="accent">{cause}</Tag>}
      </div>
    );
  }

  const mon = variant === 'monument';
  const fg = mon ? 'var(--paper)' : 'var(--sumi)', fgMuted = mon ? 'var(--ink-300)' : 'var(--text-muted)';
  const topRule = h ? 'var(--shu-500)' : (mon ? 'var(--shu-500)' : 'var(--sumi)');
  return (
    <div {...click} style={{ ...click.style, position: 'relative', background: mon ? 'var(--sumi)' : 'var(--paper-raised)', borderTop: `3px solid ${topRule}`, padding: mon ? '32px 30px 28px' : '24px 24px 22px', boxShadow: h ? 'var(--shadow-raised)' : 'var(--shadow-card)', transform: h ? 'translateY(-2px)' : 'none', transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base)', borderRadius: 'var(--radius-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: mon ? 18 : 14 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', color: fgMuted }}>{number ? `NO. ${number}` : 'R.I.P.'}</span>
        {cause && <Tag variant={mon ? 'seal' : 'accent'}>{cause}</Tag>}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: mon ? 900 : 700, fontSize: mon ? 34 : 26, lineHeight: 1.2, letterSpacing: '-.01em', color: h && !mon ? 'var(--shu-700)' : fg, transition: 'color var(--dur-base)' }}>{name}</div>
      {nameLatin && <div style={{ fontFamily: 'var(--font-latin)', fontStyle: 'italic', fontSize: 15, color: fgMuted, marginTop: 4 }}>{nameLatin}</div>}
      {lifespan && <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${mon ? 'var(--ink-700)' : 'var(--ink-200)'}` }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: mon ? 20 : 16, color: fg, fontVariantNumeric: 'tabular-nums' }}>{founded} <span style={{ color: 'var(--shu-500)' }}>—</span> {died}</span>
        {age != null && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: fgMuted }}>享年 {age}年</span>}
      </div>}
      {industry && <div style={{ marginTop: 14 }}><Tag variant={mon ? 'muted' : 'default'}>{industry}</Tag></div>}
      {epitaph && <p style={{ marginTop: 16, fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.85, color: mon ? 'var(--ink-200)' : 'var(--text-secondary)', textWrap: 'pretty' }}>{epitaph}</p>}
    </div>
  );
}

Object.assign(window, { Seal, Wordmark, Button, Tag, FilterChip, SearchField, SectionLabel, Quote, StatPlaque, MemorialCard });
