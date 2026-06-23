import type { CSSProperties } from 'react'

/** 朱印 — the vermilion seal mark. `経` filled, `卒` outline. */
export function Seal({
  size = 34,
  char = '経',
  outline = false,
  style,
}: {
  size?: number
  char?: string
  outline?: boolean
  style?: CSSProperties
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: 'none',
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'var(--radius-seal)',
        background: outline ? 'transparent' : 'var(--shu-500)',
        border: outline ? '2.5px solid var(--shu-500)' : 'none',
        boxShadow: outline ? 'none' : 'var(--shadow-seal)',
        ...style,
      }}
    >
      <b
        style={{
          fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
          fontWeight: 900,
          lineHeight: 1,
          fontSize: size * 0.56,
          color: outline ? 'var(--shu-500)' : 'var(--paper)',
        }}
      >
        {char}
      </b>
    </span>
  )
}

/** KEIEI.RIP wordmark — Latin serif, sumi + vermilion `.RIP`. */
export function Wordmark({ size = 26, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-latin), Georgia, serif",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '.005em',
        color: onDark ? 'var(--paper)' : 'var(--sumi)',
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      KEIEI
      <span style={{ color: onDark ? 'var(--shu-400)' : 'var(--shu-500)' }}>.RIP</span>
    </span>
  )
}
