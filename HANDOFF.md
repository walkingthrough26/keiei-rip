# Handoff — 2026-07-02

## プロジェクト概要

**KEIEI.RIP(経営.RIP)** — 日本企業の事業失敗を弔辞のトーンで記録する自走型メディア。

- `site/` — Next.js 16 + React 19 + Tailwind 4。Vercelにデプロイ。記事は `site/content/articles/*.md`(frontmatter + Markdown)
- `KEIEI.RIP Design System/` — 独自デザインシステム(モノクロ+朱赤、明朝体中心)。サイト全体に適用済み
- `.github/workflows/daily-article.yml` — 毎朝9時(JST)に `site/scripts/daily-article.mjs` がClaude API(Opus 4.5)で記事を自動生成 → コミット&プッシュ → Vercel自動デプロイ → X(Twitter)自動投稿
- `site/content/covered-companies.json` — 既出企業の台帳(重複記事防止。現在44社)

## 今日やったこと

### 課題:日次記事生成が約3日に1回失敗する

直近30回中8回失敗。全失敗ログを調査した結果、**全件が同一原因**:

1. Web検索で見つかる候補が既出企業ばかり(7回)、またはJSON抽出失敗(1回)でフォールバック処理に突入
2. フォールバックの `max_tokens: 800` が小さすぎて、候補5件のJSON出力が途中で切断
3. パース失敗 → リトライなしで即throw → ジョブ全体が失敗

記事が増えるほど既出被りが増え、失敗率が上がっていく構造だった。

### 対処(コミット `c3b2e11`、プッシュ済み)

`site/scripts/daily-article.mjs` を修正:

- フォールバック/抽出の `max_tokens` を 800/1500 → **4000** に引き上げ
- JSON配列取得を共通ヘルパー `requestCandidateArray` 化。パース失敗時は自動リトライ(2回)、失敗時は `stop_reason` をログ出力
- 検索キーワードを4セット(大企業/スタートアップ/中堅・老舗/業界特化)の**日替わりローテーション**に変更
- 既出44社リストをStep 1の検索プロンプトにも渡して検索段階から除外
- フォールバック候補を5件→8件に増やし、無名事例を優先する指示を追加

## 次にやること・注意点

- [ ] **明日(7/3)朝の実行結果を確認**: `gh run list --workflow daily-article.yml --limit 1`
      修正後の初回実行。失敗した場合はログに `stop_reason` が出るようになったので原因特定が容易
- 数日〜1週間程度、失敗率が実際に下がったか経過観察
- 将来「Fallback candidates were also already covered」(daily-article.mjs:546付近)で落ち始めたら、
  ネタ切れのサイン。対象期間の拡大(2023年以前も対象にする等)を検討
- GitHub Actionsのログに「Node 20 is being deprecated」の警告あり。急ぎではないが
  `daily-article.yml` の `node-version` をいずれ22/24に上げるとよい

## 運用メモ

- 手動実行: GitHub Actionsの `workflow_dispatch`(`dry_run: true` でコミットなし生成)
- ローカル生成: `cd site && npm run generate`(要 `ANTHROPIC_API_KEY`。ローカルに `.env.local` はない)
- 同日分の記事が既にあると生成はスキップされる(二重実行ガード)
