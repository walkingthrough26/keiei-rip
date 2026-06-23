import React from 'react';

/**
 * KEIEI.RIP — FilterChip
 * 業種・年代・死因で墓場を絞る四角いチップ。
 */
export function FilterChip({ active = false, children, count, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1,
    padding: '9px 14px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
    border: '1px solid var(--ink-300)',
    background: 'transparent',
    color: 'var(--ink-600)',
  };

  const activeStyle = { background: 'var(--sumi)', borderColor: 'var(--sumi)', color: 'var(--paper)' };
  const hoverStyle = { borderColor: 'var(--sumi)', color: 'var(--sumi)' };

  const composed = {
    ...base,
    ...(active ? activeStyle : (hover ? hoverStyle : null)),
    ...style,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={active}
      style={composed}
      {...rest}
    >
      {children}
      {count != null && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: active ? 'var(--shu-400)' : 'var(--text-muted)',
        }}>{count}</span>
      )}
    </button>
  );
}
