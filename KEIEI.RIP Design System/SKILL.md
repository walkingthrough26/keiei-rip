---
name: keiei-rip-design
description: Use this skill to generate well-branded interfaces and assets for KEIEI.RIP（経営.RIP）— an editorial, documentary-style archive that documents business failures and honors the people who kept challenging. Monochrome + vermilion (朱赤), Mincho-led, Japanese-first. Contains essential design guidelines, colors, type, fonts, the 朱印 seal/wordmark, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Essentials
- **Tone:** reverent, literary, documentary — never mocking. 「倒れた事業に、弔いと、敬意を。」 Japanese-first; English only as mono kickers/metadata. No emoji.
- **Color:** warm-sumi monochrome on warm paper, with a single rationed vermilion 朱赤 (`--shu-500 #c8341f`) used like a red seal.
- **Type:** Zen Old Mincho (display) / Shippori Mincho (body, open leading) / Zen Kaku Gothic New (UI) / Spectral (Latin) / JetBrains Mono (metadata). Loaded via Google Fonts in `tokens/fonts.css`.
- **Form:** near-square corners, hairline rules over shadows, the 朱印 seal as the brand mark, the 3px ink "天罫" top rule on 墓碑 cards.
- **Signature component:** `MemorialCard` (墓碑カード) — a gravestone for a dead business.

## Files
- `styles.css` — link this one file (imports all tokens).
- `tokens/` — colors, typography, spacing, effects, fonts, base.
- `components/` — Button, Tag, SectionLabel, Quote, StatPlaque, MemorialCard, SearchField, FilterChip (namespace `KEIEIRIPDesignSystem_4bc645`).
- `ui_kits/keiei_rip/` — interactive archive-site recreation; `components.jsx` has standalone (bundle-free) versions handy for static mocks.
- `guidelines/` — specimen cards.
