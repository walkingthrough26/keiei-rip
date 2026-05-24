import type { Metadata } from 'next'
import Link from 'next/link'
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
})

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Keiei.RIP — 日本の経営失敗から学ぶ',
    template: '%s | Keiei.RIP',
  },
  description:
    '日本の象徴的な経営失敗を深くリサーチ。経営者・起業家・学生が次の挑戦に活かせる深いインサイトを届けます。',
  metadataBase: new URL('https://keiei.rip'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://keiei.rip',
    siteName: 'Keiei.RIP',
    title: 'Keiei.RIP — 日本の経営失敗から学ぶ',
    description:
      '日本の象徴的な経営失敗を深くリサーチ。経営者・起業家・学生が次の挑戦に活かせる深いインサイトを届けます。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keiei.RIP — 日本の経営失敗から学ぶ',
    description:
      '日本の象徴的な経営失敗を深くリサーチ。経営者・起業家・学生が次の挑戦に活かせる深いインサイトを届けます。',
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
    <html lang="ja" className={`${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-stone-50">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-red-700 font-sans">
                Keiei.RIP
              </span>
              <span className="text-xs text-gray-400 hidden sm:block font-sans">
                日本の経営失敗から学ぶ
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-sans">
                記事一覧
              </Link>
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-sans">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 mt-24 py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-400 font-sans">
              © 2026 Keiei.RIP — 日本の経営失敗から、次の挑戦者へ深いインサイトを。
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
