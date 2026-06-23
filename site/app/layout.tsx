import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { Seal, Wordmark } from '@/components/brand'

// KEIEI.RIP type system — loaded from Google Fonts CDN (see globals.css note).
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600;700;900&family=Shippori+Mincho:wght@400;500;600;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap'

export const metadata: Metadata = {
  title: {
    default: 'KEIEI.RIP — 経営の墓場。倒れた事業に、弔いと、敬意を。',
    template: '%s | KEIEI.RIP',
  },
  description:
    '潰えた事業の墓場。日本の象徴的な経営失敗を弔い、敬意とともに記録するアーカイブ。失敗は、挑んだ者にしか訪れない。',
  metadataBase: new URL('https://keiei.rip'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://keiei.rip',
    siteName: 'KEIEI.RIP',
    title: 'KEIEI.RIP — 経営の墓場',
    description:
      '潰えた事業の墓場。日本の象徴的な経営失敗を弔い、敬意とともに記録するアーカイブ。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEIEI.RIP — 経営の墓場',
    description:
      '潰えた事業の墓場。日本の象徴的な経営失敗を弔い、敬意とともに記録するアーカイブ。',
  },
  alternates: {
    canonical: 'https://keiei.rip',
  },
  verification: {
    google: 'czlVhTOUEWtRlXg9zPQYNl8is_HqSHj2XB9hlAoloJw',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </head>
      <body>
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(244,240,231,0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--ink-200)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container)',
              margin: '0 auto',
              padding: '0 24px',
              height: 68,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Seal size={34} />
              <Wordmark size={26} />
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <Link href="/" className="nav-link" style={{ color: 'var(--sumi)' }}>
                アーカイブ
              </Link>
              <Link href="/about" className="nav-link">
                このサイトについて
              </Link>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: '.16em',
                  color: 'var(--shu-500)',
                  textTransform: 'uppercase',
                }}
              >
                R.I.P.
              </span>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ borderTop: '1px solid var(--ink-200)', marginTop: 96 }}>
          <div
            style={{
              maxWidth: 'var(--container)',
              margin: '0 auto',
              padding: '48px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Seal size={30} char="卒" outline />
              <Wordmark size={22} />
            </Link>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: '.14em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}
            >
              REST IN PEACE, AMBITION. — © 2026 KEIEI.RIP
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
