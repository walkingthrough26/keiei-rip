import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Keiei.RIP — 日本の経営失敗から学ぶ',
    template: '%s | Keiei.RIP',
  },
  description:
    '日本の象徴的な経営失敗を深くリサーチ。経営者・起業家・学生が次の挑戦に活かせる深いインサイトを届けます。',
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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-stone-50">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-red-700 font-sans">
                Keiei.RIP
              </span>
              <span className="text-xs text-gray-400 hidden sm:block font-sans">
                日本の経営失敗から学ぶ
              </span>
            </a>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-sans">
                記事一覧
              </a>
              <a href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-sans">
                About
              </a>
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
