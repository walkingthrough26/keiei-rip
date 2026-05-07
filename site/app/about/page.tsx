import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Keiei.RIPについて',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <a href="/" className="text-sm text-gray-400 hover:text-gray-700 font-sans transition-colors">
          ← 記事一覧
        </a>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Keiei.RIP</h1>
        <p className="text-lg text-gray-500 font-sans leading-relaxed">
          企業は死んでも、教訓は生き続ける。
        </p>
      </header>

      <article className="text-base leading-relaxed">
        <h2>このサイトについて</h2>
        <p>
          <strong>Keiei.RIP</strong> は、日本の象徴的な経営失敗を深くリサーチし、
          経営者・起業家・学生に届けるインサイトメディアです。
        </p>
        <p>
          事業の撤退、企業の倒産、M&Aの蹉跌、コーポレートガバナンスの崩壊——。
          日本には、語られるべき失敗の物語が無数に存在します。
          しかし多くの場合、それらは「恥」として葬り去られ、組織の記憶からも消えていきます。
        </p>
        <p>
          私たちは、失敗を批判するためにこのサイトを作ったのではありません。
          失敗の中にある意思決定の構造、組織の動力学、市場の現実を解剖し、
          次の挑戦者が同じ落とし穴に落ちないための知恵を届けることが目的です。
        </p>

        <h2>記事の構成</h2>
        <p>各記事は以下のフレームで構成されています：</p>
        <ul>
          <li>企業概要と全盛期——なぜ期待されたのか</li>
          <li>何が起きたか——タイムラインで見る崩壊の過程</li>
          <li>失敗の本質的原因——市場・経営・財務・組織・外部環境の5軸分析</li>
          <li>経営者の意思決定を再構築する——当時の視点から問い直す</li>
          <li>海外類似事例との比較——日本固有の問題か、普遍的な失敗パターンか</li>
          <li>経営者・起業家へのインサイト——具体的な示唆</li>
          <li>あなたが経営者だったら？——読者への問い</li>
        </ul>

        <h2>更新頻度</h2>
        <p>
          毎朝6時、自動的に日本のビジネスニュースをリサーチし、
          最も深い学びが得られると判断した事例を1件選定してディープリサーチを行い、
          記事を公開します。
        </p>

        <h2>読者について</h2>
        <p>
          このサイトの読者は、経営者、起業を目指す方、経営学を学ぶ学生、
          そして組織と意思決定に深い関心を持つすべての人を想定しています。
          経営の教科書には書かれない、リアルな失敗の知恵を届けます。
        </p>
      </article>
    </div>
  )
}
