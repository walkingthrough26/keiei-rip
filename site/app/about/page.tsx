import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui'

export const metadata: Metadata = {
  title: 'このサイトについて',
  description: 'KEIEI.RIP — 経営の墓場について。倒れた事業に、弔いと、敬意を。',
}

export default function AboutPage() {
  return (
    <>
      {/* —— Header (ink band) —— */}
      <section style={{ background: 'var(--sumi)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '36px 24px 56px' }}>
          <Link href="/" className="ghost-link" style={{ display: 'inline-block', marginBottom: 40, color: 'var(--ink-300)' }}>
            ← Back to Archive
          </Link>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: 'var(--shu-400)',
              marginBottom: 20,
            }}
          >
            About
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), 'Zen Old Mincho', serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              lineHeight: 1.2,
              letterSpacing: '-.02em',
              margin: 0,
              color: 'var(--paper)',
            }}
          >
            経営の墓場について
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif), 'Shippori Mincho', serif",
              fontSize: 'var(--fs-lead)',
              lineHeight: 1.9,
              color: 'var(--ink-200)',
              marginTop: 24,
              maxWidth: '32em',
            }}
          >
            企業は死んでも、教訓は生き続ける。失敗は、挑んだ者にしか訪れない。
          </p>
        </div>
      </section>

      {/* —— Body —— */}
      <article style={{ maxWidth: 'var(--container-text)', margin: '0 auto', padding: '56px 24px 0' }}>
        <SectionLabel kicker="Our Purpose" title="このサイトについて" />
        <div className="obituary" style={{ marginTop: 32 }}>
          <p>
            <strong>KEIEI.RIP（経営.RIP）</strong> は、日本の象徴的な経営失敗を弔い、
            敬意とともに記録するアーカイブです。倒れた事業のひとつひとつに墓碑（墓標）を建て、
            その生涯と死因、そして弔辞を刻んでいます。
          </p>
          <p>
            事業の撤退、企業の倒産、M&Aの蹉跌、コーポレートガバナンスの崩壊——。
            日本には、語られるべき失敗の物語が無数に存在します。
            しかし多くの場合、それらは「恥」として葬り去られ、組織の記憶からも消えていきます。
          </p>
          <p>
            私たちは、失敗を嘲るためにこの墓場を作ったのではありません。
            失敗の中にある意思決定の構造、組織の動力学、市場の現実を解剖し、
            次の挑戦者が同じ落とし穴に落ちないための知恵を遺すこと——それが弔いの意味です。
          </p>

          <h2>弔辞の構成</h2>
          <p>各墓碑の弔辞は、おおむね以下のフレームで編まれています。</p>
          <ul>
            <li>事業の概要と全盛期——なぜ期待されたのか</li>
            <li>何が起きたか——時系列で見る崩壊の過程</li>
            <li>失敗の本質的原因——市場・経営・財務・組織・外部環境の5軸分析</li>
            <li>経営者の意思決定を再構築する——当時の視点から問い直す</li>
            <li>海外類似事例との比較——日本固有の問題か、普遍的な失敗パターンか</li>
            <li>経営者・起業家へのインサイト——具体的な示唆</li>
            <li>あなたが経営者だったら？——読者への問い</li>
          </ul>

          <h2>埋葬の頻度</h2>
          <p>
            毎朝6時、日本のビジネスニュースを自動でリサーチし、
            最も深い学びが得られると判断した事例を一件選定。
            ディープリサーチを行い、新たな墓碑として埋葬します。
          </p>

          <h2>弔う者へ</h2>
          <p>
            この墓場を訪れるのは、経営者、起業を志す人、経営学を学ぶ学生、
            そして組織と意思決定に深い関心を持つすべての人です。
            教科書には書かれない、リアルな失敗の知恵を——敗者の美学とともに、ここに。
          </p>
        </div>

        <div style={{ marginTop: 56 }}>
          <Link href="/" className="ghost-link">
            ← 墓碑一覧に戻る
          </Link>
        </div>
      </article>
    </>
  )
}
