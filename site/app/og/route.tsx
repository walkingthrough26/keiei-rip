import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const CATEGORY_COLORS: Record<string, string> = {
  'DX失敗': '#2563eb',
  '新規事業失敗': '#ea580c',
  '経営判断': '#dc2626',
  '財務・M&A': '#7c3aed',
  'コーポレートガバナンス': '#475569',
  '組織・文化': '#16a34a',
  '急成長の罠': '#ca8a04',
}

let cachedFont: ArrayBuffer | null = null

async function getFont(origin: string): Promise<ArrayBuffer | null> {
  if (cachedFont) return cachedFont

  // Primary: bundled via outputFileTracingIncludes
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Bold.woff'))
    cachedFont = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
    return cachedFont
  } catch { /* fall through */ }

  // Fallback: fetch from static CDN (no-store avoids Next.js 2MB cache limit)
  try {
    const res = await fetch(`${origin}/fonts/NotoSansJP-Bold.woff`, { cache: 'no-store' })
    if (res.ok) { cachedFont = await res.arrayBuffer(); return cachedFont }
  } catch (err) { console.error('OG font fetch failed:', err) }

  return null
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const title    = searchParams.get('title')    ?? 'Keiei.RIP'
  const company  = searchParams.get('company')  ?? ''
  const category = searchParams.get('category') ?? ''
  const year     = searchParams.get('year')     ?? ''

  const categoryColor = CATEGORY_COLORS[category] ?? '#c0392b'
  const fontSize = title.length > 24 ? 44 : title.length > 16 ? 50 : 56
  const fontData = await getFont(origin)

  // satori rules: every element with children needs display:flex
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0f0f0f', fontFamily: fontData ? '"NotoSansJP"' : 'sans-serif' }}>

        {/* Red top bar */}
        <div style={{ height: 8, background: '#c0392b', flexShrink: 0 }} />

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 72px 32px' }}>

          {/* Badges row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            {category ? (
              <div style={{ display: 'flex', background: categoryColor, color: '#fff', padding: '6px 18px', borderRadius: 6, fontSize: 22, fontWeight: 700 }}>
                {category}
              </div>
            ) : null}
            {year ? (
              <div style={{ display: 'flex', color: '#666', fontSize: 22 }}>
                {year}年
              </div>
            ) : null}
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flex: 1, color: '#f0f0ee', fontSize, fontWeight: 700, lineHeight: 1.35 }}>
            {title}
          </div>

          {/* Company */}
          {company ? (
            <div style={{ display: 'flex', color: '#888', fontSize: 26, marginTop: 20, paddingTop: 20, borderTop: '1px solid #2a2a2a' }}>
              {company}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 72px', borderTop: '1px solid #1e1e1e', flexShrink: 0 }}>
          <div style={{ display: 'flex', color: '#c0392b', fontSize: 28, fontWeight: 700 }}>
            Keiei.RIP
          </div>
          <div style={{ display: 'flex', color: '#444', fontSize: 18 }}>
            日本の経営失敗から学ぶ
          </div>
        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData ? [{ name: 'NotoSansJP', data: fontData, weight: 700, style: 'normal' }] : [],
    }
  )
}
