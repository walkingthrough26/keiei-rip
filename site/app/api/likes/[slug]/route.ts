import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const count = (await kv.get<number>(`likes:${slug}`)) ?? 0
  return NextResponse.json({ count })
}

export async function POST(_req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const count = await kv.incr(`likes:${slug}`)
  return NextResponse.json({ count })
}
