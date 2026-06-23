Underline-only search input (no boxed field) — the rule turns vermilion on focus. Use `size="lg"` for a hero search.

```jsx
const [q, setQ] = React.useState('');
<SearchField value={q} onChange={setQ} onSubmit={(v) => find(v)} size="lg" />
```
