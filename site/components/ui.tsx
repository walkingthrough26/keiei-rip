import type { CSSProperties, ReactNode } from 'react'

/* ── Tag (squared judge-stamp) ──────────────────────────── */
type TagVariant = 'default' | 'solid' | 'accent' | 'seal' | 'muted'

const TAG_STYLES: Record<TagVariant, CSSProperties> = {
  default: { background: 'transparent', color: 'var(--ink-600)', border: '1px solid var(--ink-300)' },
  solid: { background: 'var(--sumi)', color: 'var(--paper)', border: '1px solid var(--sumi)' },
  accent: { background: 'transparent', color: 'var(--shu-600)', border: '1px solid var(--shu-500)' },
  seal: { background: 'var(--shu-500)', color: 'var(--paper)', border: '1px solid var(--shu-500)' },
  muted: { background: 'var(--paper-deep)', color: 'var(--ink-500)', border: '1px solid transparent' },
}

export function Tag({
  variant = 'default',
  children,
  style,
}: {
  variant?: TagVariant
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '.02em',
        lineHeight: 1,
        padding: '5px 10px',
        borderRadius: 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        ...TAG_STYLES[variant],
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ── SectionLabel (vermilion mono kicker over ruled heading) ─ */
export function SectionLabel({
  kicker,
  title,
  number,
  align = 'left',
  onDark = false,
}: {
  kicker?: string
  title: string
  number?: string
  align?: 'left' | 'center'
  onDark?: boolean
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)'
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)'
  const rule = onDark ? 'var(--ink-700)' : 'var(--sumi)'
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: 12,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: 'var(--shu-500)',
          marginBottom: 10,
        }}
      >
        {number && <span style={{ color: muted }}>{number}</span>}
        {kicker && <span>{kicker}</span>}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
          fontWeight: 700,
          fontSize: 'var(--fs-h2)',
          lineHeight: 1.15,
          letterSpacing: '-.01em',
          color: ink,
          margin: 0,
          paddingBottom: 16,
          borderBottom: `1.5px solid ${rule}`,
        }}
      >
        {title}
      </h2>
    </div>
  )
}

/* ── StatPlaque (mono figure over a ruled label) ─────────── */
export function StatPlaque({
  value,
  unit,
  label,
  sub,
  align = 'left',
  onDark = false,
  accent = false,
}: {
  value: ReactNode
  unit?: string
  label: string
  sub?: string
  align?: 'left' | 'center'
  onDark?: boolean
  accent?: boolean
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)'
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)'
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontWeight: 500,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: '-.02em',
            color: accent ? 'var(--shu-500)' : ink,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: 15, fontWeight: 700, color: muted }}>
            {unit}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: 10,
          paddingTop: 8,
          borderTop: `1px solid ${onDark ? 'var(--ink-700)' : 'var(--ink-200)'}`,
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: ink,
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ marginTop: 4, fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: '.06em', color: muted }}>
          {sub}
        </div>
      )}
    </div>
  )
}

/* ── MemorialCard (墓碑カード — the signature component) ──── */
export interface MemorialCardProps {
  href: string
  number: string
  company: string
  title: string
  year: number
  status: string
  category: string
  description?: string
  variant?: 'stone' | 'monument' | 'index'
}

export function MemorialCard({
  href,
  number,
  company,
  title,
  year,
  status,
  category,
  description,
  variant = 'stone',
}: MemorialCardProps) {
  /* —— index row variant —— */
  if (variant === 'index') {
    return (
      <a href={href} className="memorial-row">
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: 'var(--text-muted)' }}>
          {number}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 12, minWidth: 0 }}>
            <span
              className="memorial-row__name"
              style={{
                fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--sumi)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {company}
            </span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              没 {year}
            </span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
              fontSize: 14,
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </span>
        </span>
        <Tag variant="accent">{status}</Tag>
      </a>
    )
  }

  /* —— stone / monument variants —— */
  const mon = variant === 'monument'
  const fg = mon ? 'var(--paper)' : 'var(--sumi)'
  const fgMuted = mon ? 'var(--ink-300)' : 'var(--text-muted)'

  return (
    <a href={href} className={`memorial-card${mon ? ' memorial-card--monument' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: mon ? 18 : 14, gap: 12 }}>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: '.14em', color: fgMuted }}>
          NO. {number}
        </span>
        <Tag variant={mon ? 'seal' : 'accent'}>{status}</Tag>
      </div>

      <div
        className="memorial-card__name"
        style={{
          fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
          fontWeight: mon ? 900 : 700,
          fontSize: mon ? 34 : 26,
          lineHeight: 1.25,
          letterSpacing: '-.01em',
          color: fg,
        }}
      >
        {company}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          marginTop: 14,
          paddingTop: 14,
          borderTop: `1px solid ${mon ? 'var(--ink-700)' : 'var(--ink-200)'}`,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: mon ? 19 : 16, color: fg, fontVariantNumeric: 'tabular-nums' }}>
          没 <span style={{ color: 'var(--shu-500)' }}>—</span> {year}
        </span>
        <Tag variant={mon ? 'muted' : 'default'}>{category}</Tag>
      </div>

      <p
        style={{
          marginTop: 16,
          fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
          fontSize: mon ? 17 : 15,
          lineHeight: 1.85,
          color: mon ? 'var(--ink-200)' : 'var(--text-secondary)',
          textWrap: 'pretty',
        }}
      >
        {title}
      </p>

      {description && !mon && (
        <p
          style={{
            marginTop: 10,
            fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
            fontSize: 13.5,
            lineHeight: 1.8,
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
      )}
    </a>
  )
}
