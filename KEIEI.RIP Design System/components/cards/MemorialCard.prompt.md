The signature element: one gravestone for a dead business. Use `stone` in the archive grid, `monument` to feature one case, `index` for dense list rows.

```jsx
<MemorialCard
  number="0427"
  name="株式会社 暁印刷"
  industry="印刷"
  founded={1976}
  died={2009}
  cause="設備投資過剰"
  epitaph="活版からオフセットへ。時代の速さに、設備の借入が追いつかなかった。"
  href="#case-0427"
/>

<MemorialCard variant="index" number="0428" name="まちの本屋" founded={1988} died={2018} cause="EC化" href="#" />
```

Top rule turns vermilion on hover; `stone`/`monument` lift on hover. `monument` is sumi-on-paper for a hero/featured grave. Always pass `founded`+`died` — the card computes 享年.
