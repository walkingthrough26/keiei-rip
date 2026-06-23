import React from 'react';

/**
 * KEIEI.RIP — Quote / Epitaph
 * 大きな明朝の引用・弔辞。朱の縦罫を添える。
 */
export function Quote({ children, cite, source, onDark = false, style, ...rest }) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';

  return (
    <figure style={{ margin: 0, paddingLeft: '24px', borderLeft: '3px solid var(--shu-500)', ...style }} {...rest}>
      <blockquote style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'var(--fs-h3)',
        lineHeight: 1.6,
        letterSpacing: 'var(--ls-tight)',
        color: ink,
        textWrap: 'pretty',
      }}>
        {children}
      </blockquote>
      {(cite || source) && (
        <figcaption style={{
          marginTop: '16px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-small)',
          color: muted,
        }}>
          {cite && <span style={{ color: ink, fontWeight: 600 }}>{cite}</span>}
          {cite && source && <span style={{ margin: '0 8px', color: 'var(--shu-500)' }}>—</span>}
          {source && <span>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
