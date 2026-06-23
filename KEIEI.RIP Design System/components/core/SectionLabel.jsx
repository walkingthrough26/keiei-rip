import React from 'react';

/**
 * KEIEI.RIP — SectionLabel
 * 英文キッカー + 和文見出し + 罫線。編集的セクションの起点。
 */
export function SectionLabel({ kicker, title, number, align = 'left', onDark = false, style, ...rest }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  const rule = onDark ? 'var(--ink-700)' : 'var(--sumi)';

  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {(kicker || number) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-micro)',
          letterSpacing: 'var(--ls-label)',
          textTransform: 'uppercase',
          color: 'var(--shu-500)',
          marginBottom: '10px',
        }}>
          {number && <span style={{ color: muted }}>{number}</span>}
          {kicker && <span>{kicker}</span>}
        </div>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--fs-h2)',
        lineHeight: 'var(--lh-tight)',
        letterSpacing: 'var(--ls-tight)',
        color: ink,
        margin: 0,
        paddingBottom: '16px',
        borderBottom: `1.5px solid ${rule}`,
      }}>
        {title}
      </h2>
    </div>
  );
}
