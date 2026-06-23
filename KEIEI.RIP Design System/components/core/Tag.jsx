import React from 'react';

/**
 * KEIEI.RIP — Tag
 * 業種・死因・年代などのメタを示す小さな標識。判子のように四角い。
 */
export function Tag({ variant = 'default', children, style, ...rest }) {
  const variants = {
    default: { background: 'transparent', color: 'var(--ink-600)', border: '1px solid var(--ink-300)' },
    solid:   { background: 'var(--sumi)', color: 'var(--paper)', border: '1px solid var(--sumi)' },
    accent:  { background: 'transparent', color: 'var(--shu-600)', border: '1px solid var(--shu-500)' },
    seal:    { background: 'var(--shu-500)', color: 'var(--paper)', border: '1px solid var(--shu-500)' },
    muted:   { background: 'var(--paper-deep)', color: 'var(--ink-500)', border: '1px solid transparent' },
  };

  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1,
    padding: '5px 10px',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
    ...(variants[variant] || variants.default),
    ...style,
  };

  return <span style={composed} {...rest}>{children}</span>;
}
