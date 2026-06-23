import React from 'react';

/**
 * KEIEI.RIP — Button
 * 朱の主ボタン / 墨の枠線 / ゴースト。和文ラベル前提。
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  disabled = false,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '15px' },
    lg: { padding: '16px 32px', fontSize: '17px' },
  };

  const palette = {
    primary: {
      base: { background: 'var(--shu-500)', color: 'var(--paper)', border: '1.5px solid var(--shu-500)' },
      hover: { background: 'var(--shu-600)', borderColor: 'var(--shu-600)' },
      press: { background: 'var(--shu-700)', borderColor: 'var(--shu-700)' },
    },
    secondary: {
      base: { background: 'transparent', color: 'var(--sumi)', border: '1.5px solid var(--sumi)' },
      hover: { background: 'var(--sumi)', color: 'var(--paper)' },
      press: { background: 'var(--ink-800)' },
    },
    ghost: {
      base: { background: 'transparent', color: 'var(--sumi)', border: '1.5px solid transparent' },
      hover: { color: 'var(--shu-500)' },
      press: { color: 'var(--shu-700)' },
    },
  };

  const p = palette[variant] || palette.primary;

  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    letterSpacing: '0.02em',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
    transform: press && !disabled ? 'translateY(1px)' : 'translateY(0)',
    textDecoration: 'none',
    ...sizes[size],
    ...p.base,
    ...(!disabled && hover ? p.hover : null),
    ...(!disabled && press ? p.press : null),
    ...style,
  };

  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  const Tag = href ? 'a' : as;
  return (
    <Tag
      style={composed}
      href={href}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      {...handlers}
      {...rest}
    >
      {children}
    </Tag>
  );
}
