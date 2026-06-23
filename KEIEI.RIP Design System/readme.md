# KEIEI.RIP — Design System

> 経営の墓場。倒れた事業に、弔いと、敬意を。
> An archive that documents business failures (経営の失敗) and honors the people who kept challenging — *the dignity of trying, even in defeat.*

KEIEI.RIP（経営.RIP）is an editorial, documentary-style web property. It is a **graveyard of dead businesses**: each closed company, shop, or venture gets a 墓碑 (gravestone) — a number, a lifespan, a cause of death, and a 弔辞 (eulogy). The tone is not mocking. It is reverent, literary, and quietly admiring of the attempt. 「失敗は、挑んだ者にしか訪れない。」

---

## Sources & provenance

- **`uploads/KFCreport2025_ALL.pdf`** — 日本KFC「コミュニケーションレポート2025」（32p）. Used **only as a visual/tonal reference** for editorial corporate-report craft: dotted-leader tables of contents (目次), decade-column timelines (沿革), grid-of-cards product histories, and a calm, structured Mincho layout. **None of KFC's branding, color, or content is reused.** KEIEI.RIP's identity (monochrome + 朱赤, the 経 seal, the wordmark) was built fresh for this brief.
- No codebase or Figma was provided — the visual system is original to this brief, designed against the user's direction.

### Direction confirmed with the user
- Mood: **エディトリアル雑誌風 / documentary** — intellectual, made to be read.
- Palette: **モノクロ + 朱赤** (monochrome + vermilion = mourning + passion).
- Type: **明朝体中心** (Mincho-led) for 格調・追悼・読み物感.
- Language: **日本語メイン + 英語の補助.**
- Core surface: **「墓碑」一覧・アーカイブ** (the graveyard of dead businesses).
- Tone words: **挑戦・失敗・力強さ.**
- Logo: **ワードマーク中心** (proposed here).

---

## CONTENT FUNDAMENTALS — how KEIEI.RIP writes

**Voice.** Third person, literary, restrained. The site is a chronicler and a mourner, not a critic. It addresses neither "you" nor "we" prominently — it speaks *about* the deceased business with the cadence of an obituary (弔辞). Sentences are often short and declarative, then occasionally open into a longer reflective line.

**Casing & script.** Japanese-first. Headlines and body are 和文 (Mincho). English appears as **kickers and metadata only** — uppercase, mono, wide-tracked (`ARCHIVE`, `OBITUARY`, `REST IN PEACE`, `NO. 0427`). Never use English for primary reading copy.

**Reverence over snark.** The premise (celebrating failure) is handled with dignity. We say 「弔いと、敬意を」, not "lol they went bankrupt." Cause-of-death tags are factual and neutral (`資金繰り`, `後継者不在`, `コロナ禍`), never derisive.

**Concrete, human detail.** Eulogies anchor on one specific, telling image rather than abstractions:
- 「三代続いた町の本屋。最後の客は、初代を知る老人だった。」
- 「ママは最後の夜も、開けていない店のために氷を作っていた。」
- 「デミグラスのレシピは、誰にも渡されないまま鍋ごと処分された。」

**Numbers as epitaph.** Figures are stated plainly and given weight: 享年33年 / 最盛期217店 / 負債48億円. They read like the dates on a headstone.

**Recurring vocabulary.** 墓碑・墓標・墓場 / 弔辞・弔い / 享年・創業・廃業・没 / 挑戦・敗者の美学.

**Emoji.** None. Ever. The only "mark" is the 朱印 (vermilion seal) and the em dash (—).

---

## VISUAL FOUNDATIONS

**Overall feeling.** A well-set memorial booklet or a serious culture magazine: warm paper, black Mincho ink, one decisive stroke of vermilion. Structure comes from **hairline rules and generous whitespace**, not boxes and shadows.

**Color.** Monochrome warm-sumi neutrals (`--sumi #161310` → `--ink-100`) on warm paper (`--paper #f4f0e7`, cards `--paper-raised #faf7f0`). A single chromatic accent: **vermilion 朱赤 `--shu-500 #c8341f`** (hover `--shu-600`, press `--shu-700`). Vermilion is rationed — used like a red seal (朱印): the wordmark's `.RIP`, the em dash between life-years, a cause tag, one primary button per view, the focus underline. Dark "ink bands" (`--sumi` full-bleed sections) carry stats and case headers in `--paper` text.

**Type.** Display & headings: **Zen Old Mincho** (700–900) — dignified, calligraphic. Reading body: **Shippori Mincho** (400–500) at 17–18px with very open line-height (1.9–2.0) — 和文 needs air. UI labels: **Zen Kaku Gothic New** (sans). Latin serif accents: **Spectral** (often italic). Metadata/numbers/kickers: **JetBrains Mono**, uppercase, `.14–.22em` tracking. `font-feature-settings: "palt"` tightens 和文.

**Backgrounds.** Flat warm paper. **No gradients, no photographic hero, no illustration.** Texture is implied by the off-white paper tone and the ink/paper contrast. Full-bleed sumi bands provide rhythm and gravity.

**Layout.** 1200px max container; article column 760px. Editorial motifs borrowed from the reference report: **dotted-leader contents**, **decade/year mono labels**, **top-ruled plaques**. Section openers = vermilion mono kicker + optional number over a Mincho heading underlined by a 1.5px ink rule. Sticky translucent header (paper at 88% + blur).

**Corners & borders.** Nearly square — `--radius-sm 2px` is the default; tags/chips stay squared (judges as 判子 stamps, not pills). The signature 墓碑 carries a **3px ink top rule** (the "天罫" / headstone cap) that turns vermilion on hover. Hairlines are `--ink-200`; structural rules are `--sumi`.

**Shadows.** Faint and warm — `--shadow-card` (barely-there lift) and `--shadow-raised` (on hover). Structure is carried by rules, not elevation. No glows.

**Motion.** Quiet and quick. `--ease-standard cubic-bezier(.2,0,0,1)`, 120–360ms. Cards lift `-2px` and deepen shadow on hover; the top rule shifts to vermilion. No bounces, no infinite loops, no parallax.

**Hover / press.**
- Buttons: primary darkens (`shu-500→600`); secondary inverts to sumi fill; ghost text turns vermilion. Press = `translateY(1px)` + a darker shade.
- Cards: lift + vermilion top rule + name turns vermilion.
- Chips: ink hairline + ink text on hover; active = sumi fill with vermilion count.
- Inputs: bottom rule turns vermilion on focus (no box).

**Transparency / blur.** Used once — the sticky header (`rgba(244,240,231,.88)` + `backdrop-filter: blur(8px)`). Elsewhere surfaces are opaque.

**Imagery vibe.** This system intentionally ships **without photography**. If photos are ever added, treat them as warm-toned monochrome / duotone (sumi + paper) with grain — never bright or saturated. Confirm with the user before introducing imagery.

---

## ICONOGRAPHY

KEIEI.RIP is **deliberately icon-light** — it's an editorial archive, and meaning is carried by Mincho type, mono labels, and the 朱印 seal rather than by an icon set.

- **The 朱印 / seal mark** is the primary graphic device: a vermilion rounded-square (`--radius-seal 3px`) holding a single Mincho kanji (`経` filled, `卒` outline). It serves as logo mark, favicon, and section accent. Built in CSS/HTML (`Seal` in the UI kit) — no image asset needed.
- **Unicode glyphs only**, used sparingly: `⌕` (search), `←` (back), `—` (em dash, always vermilion between life-years), `R.I.P.` / `✝` as a mourning marker.
- **No icon font, no SVG sprite, no emoji.** None were present in the source material and none fit the tone.
- **If richer icons become necessary** (e.g. a settings or admin surface): use a **thin-stroke (1.5px), squared-cap** line set such as **Lucide** ([cdn](https://unpkg.com/lucide-static)) at `--ink-600`, sized to match cap height. Flagged as a substitution — confirm before adopting, since it would introduce a vocabulary the brand currently avoids.

---

## VISUAL ASSETS

The brand is type- and CSS-driven, so there are no binary logos/illustrations to ship. The reusable marks live as code:
- **Wordmark** `KEIEI.RIP` — Latin serif (Spectral), `KEIEI` in sumi + `.RIP` in vermilion, optionally locked up with the 経 seal — `guidelines/brand-wordmark.card.html` (and `Wordmark` in the UI kit).
- **Seal** `経` / `卒` — `guidelines/brand-seal.card.html` (and `Seal` in the UI kit).
- **Motifs** (天罫 / lifespan / R.I.P. marker) — `guidelines/brand-motifs.card.html`.

> ⚠️ **Fonts are loaded from Google Fonts CDN** (`tokens/fonts.css`), not shipped as local binaries — Japanese webfont families are large and split across many unicode-range files, so embedding them is impractical here. All five families (Zen Old Mincho, Shippori Mincho, Zen Kaku Gothic New, Spectral, JetBrains Mono) are Google-hosted, so consumers need network access. **If you require self-hosted/offline fonts, send the licensed font files and I'll wire up local `@font-face`.**

---

## INDEX / manifest

**Root**
- `styles.css` — single entry point (imports only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper.

**`tokens/`** (each `@import`ed by `styles.css`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `base.css`

**`guidelines/`** — foundation specimen cards (Design System tab)
- Type: display / body / labels / latin / scale
- Colors: sumi ramp / vermilion / surfaces
- Spacing: scale / rules & leaders / radii & shadow
- Brand: wordmark / seal / motifs

**`components/`** — reusable primitives (namespace `KEIEIRIPDesignSystem_4bc645`)
- `core/` — **Button**, **Tag**, **SectionLabel**, **Quote**, **StatPlaque**
- `cards/` — **MemorialCard** (墓碑カード — *signature*; `stone` / `monument` / `index` variants)
- `forms/` — **SearchField**, **FilterChip**

**`ui_kits/keiei_rip/`** — interactive recreation of the archive site
- `index.html` (Home → 墓碑詳細, click-through) · `App.jsx` · `SiteHeader.jsx` · `HomeArchive.jsx` · `CaseDetail.jsx` · `components.jsx` · `data.js`

---

## Using a component (consumer pattern)

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { MemorialCard } = window.KEIEIRIPDesignSystem_4bc645;
  // <MemorialCard number="0427" name="株式会社 暁印刷" founded={1976} died={2009} cause="設備投資過剰" .../>
</script>
```
