import React from 'react';

/**
 * KEIEI.RIP — StatPlaque
 * 数字の銘板。mono の大きな数字 + 和文ラベル。墓碑の記録に。
 */
export function StatPlaque({ value, unit, label, sub, align = 'left', onDark = false, accent = false, style, ...rest }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  const numColor = accent ? 'var(--shu-500)' : ink;

  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '4px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          fontSize: '40px',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: numColor,
          fontVariantNumeric: 'tabular-nums',
        }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700, color: muted }}>{unit}</span>}
      </div>
      <div style={{
        marginTop: '10px',
        paddingTop: '8px',
        borderTop: `1px solid ${onDark ? 'var(--ink-700)' : 'var(--ink-200)'}`,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-small)',
        fontWeight: 600,
        color: ink,
      }}>{label}</div>
      {sub && <div style={{ marginTop: '4px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-micro)', letterSpacing: '0.06em', color: muted }}>{sub}</div>}
    </div>
  );
}
