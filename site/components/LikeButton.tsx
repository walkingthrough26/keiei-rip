'use client'

import { useEffect, useState } from 'react'

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) setLiked(localStorage.getItem(`liked:${slug}`) === '1')
    })
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0))
    return () => {
      cancelled = true
    }
  }, [slug])

  async function handleLike() {
    if (liked) return
    setLiked(true)
    setCount((c) => (c ?? 0) + 1)
    localStorage.setItem(`liked:${slug}`, '1')
    try {
      const res = await fetch(`/api/likes/${slug}`, { method: 'POST' })
      const d = await res.json()
      setCount(d.count)
    } catch {
      // keep optimistic update
    }
  }

  const active = liked
  const showInk = !active && hover

  return (
    <button
      onClick={handleLike}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={active}
      aria-label={active ? '献花済み' : '献花する'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 22px',
        borderRadius: 'var(--radius-sm)',
        cursor: active ? 'default' : 'pointer',
        fontFamily: 'var(--font-sans), system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '.04em',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        background: active ? 'var(--shu-500)' : showInk ? 'var(--sumi)' : 'transparent',
        color: active ? 'var(--paper)' : showInk ? 'var(--paper)' : 'var(--sumi)',
        border: `1.5px solid ${active ? 'var(--shu-500)' : 'var(--sumi)'}`,
      }}
    >
      <span aria-hidden="true" style={{ fontFamily: "var(--font-display), 'Zen Old Mincho', serif", fontSize: 16, lineHeight: 1 }}>
        献花
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontVariantNumeric: 'tabular-nums',
          color: active ? 'var(--paper)' : showInk ? 'var(--shu-400)' : 'var(--shu-500)',
        }}
      >
        {count === null ? '…' : count}
      </span>
    </button>
  )
}
