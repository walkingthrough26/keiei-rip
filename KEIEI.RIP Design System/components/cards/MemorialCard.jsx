import React from 'react';
import { Tag } from '../core/Tag.jsx';

/**
 * KEIEI.RIP — MemorialCard / 墓碑カード
 * 亡くなった事業を悼む一基の墓碑。アーカイブの中核。
 * variant: stone(既定の銘板) / monument(墨地の大墓標) / index(一覧の一行)
 */
export function MemorialCard({
  name,
  nameLatin,
  industry,
  founded,
  died,
  cause,
  epitaph,
  number,
  variant = 'stone',
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lifespan = (founded != null && died != null) ? `${founded} — ${died}` : null;
  const age = (founded != null && died != null) ? (died - founded) : null;

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick,
  };
  const Tag_ = href ? 'a' : 'div';
  const interactive = !!(href || onClick);
  const baseLink = { href, textDecoration: 'none', color: 'inherit', display: 'block', cursor: interactive ? 'pointer' : 'default' };

  // —— INDEX: 一覧の一行 ——
  if (variant === 'index') {
    return (
      <Tag_ {...baseLink} {...handlers} {...rest} style={{
        ...baseLink,
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        alignItems: 'center',
        gap: '20px',
        padding: '18px 8px',
        borderBottom: '1px solid var(--ink-200)',
        background: hover && interactive ? 'var(--paper-raised)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-standard)',
        ...style,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{number || '—'}</span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '14px', minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: hover && interactive ? 'var(--shu-600)' : 'var(--sumi)', transition: 'color var(--dur-fast)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          {lifespan && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{lifespan}</span>}
        </span>
        {cause && <Tag variant="accent">{cause}</Tag>}
      </Tag_>
    );
  }

  // —— MONUMENT: 墨地の大墓標 ——
  const isMonument = variant === 'monument';
  const surface = isMonument ? 'var(--sumi)' : 'var(--paper-raised)';
  const fg = isMonument ? 'var(--paper)' : 'var(--sumi)';
  const fgMuted = isMonument ? 'var(--ink-300)' : 'var(--text-muted)';
  const topRule = hover && interactive ? 'var(--shu-500)' : (isMonument ? 'var(--shu-500)' : 'var(--sumi)');

  return (
    <Tag_ {...baseLink} {...handlers} {...rest} style={{
      ...baseLink,
      position: 'relative',
      background: surface,
      borderTop: `3px solid ${topRule}`,
      padding: isMonument ? '32px 30px 28px' : '24px 24px 22px',
      boxShadow: interactive && hover ? 'var(--shadow-raised)' : 'var(--shadow-card)',
      transform: interactive && hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      borderRadius: 'var(--radius-sm)',
      ...style,
    }}>
      {/* header: number + cause */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMonument ? '18px' : '14px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-micro)', letterSpacing: '0.14em', color: fgMuted }}>
          {number ? `NO. ${number}` : 'R.I.P.'}
        </span>
        {cause && <Tag variant={isMonument ? 'seal' : 'accent'}>{cause}</Tag>}
      </div>

      {/* name */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: isMonument ? 900 : 700,
        fontSize: isMonument ? '34px' : '26px',
        lineHeight: 1.2,
        letterSpacing: 'var(--ls-tight)',
        color: hover && interactive && !isMonument ? 'var(--shu-700)' : fg,
        transition: 'color var(--dur-base)',
      }}>{name}</div>
      {nameLatin && (
        <div style={{ fontFamily: 'var(--font-latin)', fontStyle: 'italic', fontSize: '15px', color: fgMuted, marginTop: '4px' }}>{nameLatin}</div>
      )}

      {/* lifespan */}
      {lifespan && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${isMonument ? 'var(--ink-700)' : 'var(--ink-200)'}` }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: isMonument ? '20px' : '16px', color: fg, fontVariantNumeric: 'tabular-nums' }}>
            {founded} <span style={{ color: 'var(--shu-500)' }}>—</span> {died}
          </span>
          {age != null && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: fgMuted }}>享年 {age}年</span>}
        </div>
      )}

      {/* meta + epitaph */}
      {industry && (
        <div style={{ marginTop: '14px' }}>
          <Tag variant={isMonument ? 'muted' : 'default'}>{industry}</Tag>
        </div>
      )}
      {epitaph && (
        <p style={{
          marginTop: '16px',
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          lineHeight: 1.85,
          color: isMonument ? 'var(--ink-200)' : 'var(--text-secondary)',
          textWrap: 'pretty',
        }}>{epitaph}</p>
      )}
    </Tag_>
  );
}
