A text-led button; vermilion `primary` is reserved for the single "move forward" action on a view, `secondary` (ink outline) and `ghost` carry everything else.

```jsx
<Button variant="primary" size="md">アーカイブを見る</Button>
<Button variant="secondary">弔辞を読む</Button>
<Button variant="ghost" size="sm">もっと見る</Button>
```

Variants: `primary` (朱 fill), `secondary` (sumi outline, inverts on hover), `ghost`. Sizes `sm | md | lg`. Set `href` to render an `<a>`. Use sparingly — this is an editorial archive, not an app.
