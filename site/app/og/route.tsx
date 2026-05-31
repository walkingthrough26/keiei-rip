import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const CATEGORY_COLORS: Record<string, string> = {
  'DX失敗':               '#2563eb',
  '新規事業失敗':          '#ea580c',
  '経営判断':              '#dc2626',
  '財務・M&A':             '#7c3aed',
  'コーポレートガバナンス': '#475569',
  '組織・文化':            '#16a34a',
  '急成長の罠':            '#ca8a04',
}

// Gradient bg per category: adds visual variety across articles
const CATEGORY_BG: Record<string, [string, string]> = {
  'DX失敗':               ['#04082e', '#090c20'],
  '新規事業失敗':          ['#1e0c00', '#120a00'],
  '経営判断':              ['#1c0404', '#0f0404'],
  '財務・M&A':             ['#0e0420', '#08030f'],
  'コーポレートガバナンス': ['#0a0c10', '#060809'],
  '組織・文化':            ['#031208', '#020a05'],
  '急成長の罠':            ['#181000', '#0e0b00'],
}

let cachedFont: ArrayBuffer | null = null

async function getFont(origin: string): Promise<ArrayBuffer | null> {
  if (cachedFont) return cachedFont
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Bold.woff'))
    cachedFont = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
    return cachedFont
  } catch { /* fall through */ }
  try {
    const res = await fetch(`${origin}/fonts/NotoSansJP-Bold.woff`, { cache: 'no-store' })
    if (res.ok) { cachedFont = await res.arrayBuffer(); return cachedFont }
  } catch {}
  return null
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const title    = searchParams.get('title')    ?? 'Keiei.RIP'
  const company  = searchParams.get('company')  ?? ''
  const category = searchParams.get('category') ?? ''
  const year     = searchParams.get('year')     ?? ''

  const accent    = CATEGORY_COLORS[category] ?? '#c0392b'
  const [bg1, bg2] = CATEGORY_BG[category] ?? ['#160404', '#0f0f0f']
  const fontSize  = title.length > 22 ? 46 : title.length > 14 ? 54 : 62
  const fontData  = await getFont(origin)
  const ff        = fontData ? '"NotoSansJP"' : 'sans-serif'

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: `linear-gradient(145deg, ${bg1} 0%, #111 55%, ${bg2} 100%)`,
        fontFamily: ff,
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── decorative: large faded year number ── */}
        {year ? (
          <div style={{
            position: 'absolute', right: -10, top: -20,
            fontSize: 340, fontWeight: 700, lineHeight: 1,
            color: accent, opacity: 0.06,
            fontFamily: ff,
          }}>
            {year}
          </div>
        ) : null}

        {/* ── decorative: diagonal accent lines ── */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 320, height: 8,
          background: `linear-gradient(90deg, transparent, ${accent})`,
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute', top: 8, right: 0,
          width: 180, height: 2,
          background: `linear-gradient(90deg, transparent, ${accent})`,
          opacity: 0.3,
        }} />

        {/* ── left accent bar ── */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 8,
          background: `linear-gradient(180deg, ${accent}, transparent)`,
        }} />

        {/* ── watermark: company name ── */}
        {company ? (
          <div style={{
            position: 'absolute', bottom: 52, left: 40, right: 40,
            fontSize: 110, fontWeight: 700, lineHeight: 1,
            color: '#fff', opacity: 0.035,
            fontFamily: ff,
            overflow: 'hidden',
          }}>
            {company}
          </div>
        ) : null}

        {/* ── main content ── */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          flex: 1, padding: '56px 72px 28px 80px',
        }}>

          {/* top row: incident tag + category badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <div style={{
              display: 'flex',
              background: '#c0392b', color: '#fff',
              padding: '5px 14px', borderRadius: 3,
              fontSize: 14, fontWeight: 700,
              letterSpacing: '0.12em',
            }}>
              INCIDENT
            </div>
            {category ? (
              <div style={{
                display: 'flex',
                background: accent + '22',
                border: `1px solid ${accent}88`,
                color: accent,
                padding: '5px 16px', borderRadius: 3,
                fontSize: 18, fontWeight: 700,
              }}>
                {category}
              </div>
            ) : null}
            {year ? (
              <div style={{ display: 'flex', color: '#555', fontSize: 18, marginLeft: 4 }}>
                {year}年
              </div>
            ) : null}
          </div>

          {/* title */}
          <div style={{
            display: 'flex', flex: 1,
            color: '#f5f5f0',
            fontSize, fontWeight: 700,
            lineHeight: 1.3,
            alignItems: 'flex-start',
          }}>
            {title}
          </div>

          {/* company row */}
          {company ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
              <div style={{ display: 'flex', width: 3, height: 28, background: accent, flexShrink: 0 }} />
              <div style={{ display: 'flex', color: '#bbb', fontSize: 26, fontWeight: 700 }}>
                {company}
              </div>
            </div>
          ) : null}
        </div>

        {/* ── footer ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 80px',
          background: 'rgba(0,0,0,0.45)',
          borderTop: `1px solid ${accent}44`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', width: 6, height: 6, borderRadius: 3, background: '#c0392b' }} />
            <div style={{ display: 'flex', color: '#e8e8e0', fontSize: 26, fontWeight: 700 }}>
              Keiei.RIP
            </div>
          </div>
          <div style={{ display: 'flex', color: '#444', fontSize: 16, letterSpacing: '0.05em' }}>
            日本の経営失敗から学ぶ
          </div>
        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [{ name: 'NotoSansJP', data: fontData, weight: 700, style: 'normal' }]
        : [],
    }
  )
}
