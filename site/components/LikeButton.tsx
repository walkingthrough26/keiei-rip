'use client'

import { useEffect, useState } from 'react'

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === '1')
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0))
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

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      aria-label={liked ? 'いいね済み' : 'いいねする'}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans transition-colors ${
        liked
          ? 'border-red-300 bg-red-50 text-red-500 cursor-default'
          : 'border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:text-red-500 cursor-pointer'
      }`}
    >
      <span className="text-base">{liked ? '❤️' : '🤍'}</span>
      <span>{count === null ? '…' : count}</span>
    </button>
  )
}
