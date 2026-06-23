import React from 'react';

/**
 * KEIEI.RIP — SearchField
 * 墓場を掘る検索。下罫線だけの編集的な入力。
 */
export function SearchField({ value, onChange, onSubmit, placeholder = '社名・業種で墓場を探す', size = 'md', style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const heights = { md: { fontSize: '17px', pad: '10px 0' }, lg: { fontSize: '22px', pad: '14px 0' } };
  const h = heights[size] || heights.md;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: `1.5px solid ${focus ? 'var(--shu-500)' : 'var(--sumi)'}`,
        transition: 'border-color var(--dur-base) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: focus ? 'var(--shu-500)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>⌕</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-serif)',
          fontSize: h.fontSize,
          color: 'var(--sumi)',
          padding: h.pad,
          minWidth: 0,
        }}
      />
    </form>
  );
}
