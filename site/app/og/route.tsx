import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const SITE_URL = 'https://keiei.rip'

const CATEGORY_COLORS: Record<string, string> = {
  'DX失敗': '#2563eb',
  '新規事業失敗': '#ea580c',
  '経営判断': '#dc2626',
  '財務・M&A': '#7c3aed',
  'コーポレートガバナンス': '#475569',
  '組織・文化': '#16a34a',
  '急成長の罠': '#ca8a04',
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? 'Keiei.RIP'
  const company = searchParams.get('company') ?? ''
  const category = searchParams.get('category') ?? ''
  const year = searchParams.get('year') ?? ''

  const categoryColor = CATEGORY_COLORS[category] ?? '#c0392b'

  // Fetch Noto Sans JP Bold for Japanese text rendering
  let fontData: ArrayBuffer | null = null
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OGImageBot/1.0)' } }
    ).then((r) => r.text())
    const fontUrl = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1]
    if (fontUrl) {
      fontData = await fetch(fontUrl).then((r) => r.arrayBuffer())
    }
  } catch {
    // Fall back to system fonts if fetch fails
  }

  const fontSize = title.length > 24 ? 46 : title.length > 16 ? 52 : 58

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0f0f0f',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: fontData ? '"NotoSansJP"' : 'sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #c0392b, #e74c3c)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '72px 72px 40px',
            flex: 1,
          }}
        >
          {/* Category + Year badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            {category && (
              <div
                style={{
                  background: categoryColor,
                  color: '#fff',
                  padding: '6px 18px',
                  borderRadius: 6,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                }}
              >
                {category}
              </div>
            )}
            {year && (
              <div
                style={{
                  color: '#666',
                  fontSize: 22,
                  fontWeight: 400,
                }}
              >
                {year}年
              </div>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              color: '#f0f0ee',
              fontSize,
              fontWeight: 700,
              lineHeight: 1.35,
              flex: 1,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {title}
          </div>

          {/* Company */}
          {company && (
            <div
              style={{
                color: '#888',
                fontSize: 28,
                marginTop: 20,
                paddingTop: 20,
                borderTop: '1px solid #222',
              }}
            >
              {company}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 72px',
            borderTop: '1px solid #1e1e1e',
          }}
        >
          <div style={{ color: '#c0392b', fontSize: 30, fontWeight: 700, letterSpacing: '0.02em' }}>
            Keiei.RIP
          </div>
          <div style={{ color: '#444', fontSize: 18 }}>
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
