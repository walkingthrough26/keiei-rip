/* @ds-bundle: {"format":3,"namespace":"KEIEIRIPDesignSystem_4bc645","components":[{"name":"MemorialCard","sourcePath":"components/cards/MemorialCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Quote","sourcePath":"components/core/Quote.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"StatPlaque","sourcePath":"components/core/StatPlaque.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"FilterChip","sourcePath":"components/forms/FilterChip.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"}],"sourceHashes":{"components/cards/MemorialCard.jsx":"2472140b9579","components/core/Button.jsx":"4f3e8b3fdab3","components/core/Quote.jsx":"d9159e4c09bb","components/core/SectionLabel.jsx":"8c61b8a582b1","components/core/StatPlaque.jsx":"e74e2444123d","components/core/Tag.jsx":"20c3c3645f90","components/forms/FilterChip.jsx":"54eb9c92d8b9","components/forms/SearchField.jsx":"2b1136645269","ui_kits/keiei_rip/App.jsx":"aed560e9023b","ui_kits/keiei_rip/CaseDetail.jsx":"300e74df8a7e","ui_kits/keiei_rip/HomeArchive.jsx":"211f63f45d75","ui_kits/keiei_rip/SiteHeader.jsx":"8b96e849a3e4","ui_kits/keiei_rip/components.jsx":"0205b9e553fe","ui_kits/keiei_rip/data.js":"461a359f984a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KEIEIRIPDesignSystem_4bc645 = window.KEIEIRIPDesignSystem_4bc645 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — Button
 * 朱の主ボタン / 墨の枠線 / ゴースト。和文ラベル前提。
 */
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  disabled = false,
  fullWidth = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '13px'
    },
    md: {
      padding: '12px 24px',
      fontSize: '15px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: '17px'
    }
  };
  const palette = {
    primary: {
      base: {
        background: 'var(--shu-500)',
        color: 'var(--paper)',
        border: '1.5px solid var(--shu-500)'
      },
      hover: {
        background: 'var(--shu-600)',
        borderColor: 'var(--shu-600)'
      },
      press: {
        background: 'var(--shu-700)',
        borderColor: 'var(--shu-700)'
      }
    },
    secondary: {
      base: {
        background: 'transparent',
        color: 'var(--sumi)',
        border: '1.5px solid var(--sumi)'
      },
      hover: {
        background: 'var(--sumi)',
        color: 'var(--paper)'
      },
      press: {
        background: 'var(--ink-800)'
      }
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--sumi)',
        border: '1.5px solid transparent'
      },
      hover: {
        color: 'var(--shu-500)'
      },
      press: {
        color: 'var(--shu-700)'
      }
    }
  };
  const p = palette[variant] || palette.primary;
  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    letterSpacing: '0.02em',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
    transform: press && !disabled ? 'translateY(1px)' : 'translateY(0)',
    textDecoration: 'none',
    ...sizes[size],
    ...p.base,
    ...(!disabled && hover ? p.hover : null),
    ...(!disabled && press ? p.press : null),
    ...style
  };
  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  };
  const Tag = href ? 'a' : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: composed,
    href: href,
    disabled: Tag === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — Quote / Epitaph
 * 大きな明朝の引用・弔辞。朱の縦罫を添える。
 */
function Quote({
  children,
  cite,
  source,
  onDark = false,
  style,
  ...rest
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      paddingLeft: '24px',
      borderLeft: '3px solid var(--shu-500)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--fs-h3)',
      lineHeight: 1.6,
      letterSpacing: 'var(--ls-tight)',
      color: ink,
      textWrap: 'pretty'
    }
  }, children), (cite || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: '16px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-small)',
      color: muted
    }
  }, cite && /*#__PURE__*/React.createElement("span", {
    style: {
      color: ink,
      fontWeight: 600
    }
  }, cite), cite && source && /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px',
      color: 'var(--shu-500)'
    }
  }, "\u2014"), source && /*#__PURE__*/React.createElement("span", null, source)));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Quote.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — SectionLabel
 * 英文キッカー + 和文見出し + 罫線。編集的セクションの起点。
 */
function SectionLabel({
  kicker,
  title,
  number,
  align = 'left',
  onDark = false,
  style,
  ...rest
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  const rule = onDark ? 'var(--ink-700)' : 'var(--sumi)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), (kicker || number) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: '12px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-micro)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--shu-500)',
      marginBottom: '10px'
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      color: muted
    }
  }, number), kicker && /*#__PURE__*/React.createElement("span", null, kicker)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--fs-h2)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-tight)',
      color: ink,
      margin: 0,
      paddingBottom: '16px',
      borderBottom: `1.5px solid ${rule}`
    }
  }, title));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/StatPlaque.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — StatPlaque
 * 数字の銘板。mono の大きな数字 + 和文ラベル。墓碑の記録に。
 */
function StatPlaque({
  value,
  unit,
  label,
  sub,
  align = 'left',
  onDark = false,
  accent = false,
  style,
  ...rest
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)';
  const muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  const numColor = accent ? 'var(--shu-500)' : ink;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: '40px',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: numColor,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      fontWeight: 700,
      color: muted
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      paddingTop: '8px',
      borderTop: `1px solid ${onDark ? 'var(--ink-700)' : 'var(--ink-200)'}`,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-small)',
      fontWeight: 600,
      color: ink
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '4px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-micro)',
      letterSpacing: '0.06em',
      color: muted
    }
  }, sub));
}
Object.assign(__ds_scope, { StatPlaque });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatPlaque.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — Tag
 * 業種・死因・年代などのメタを示す小さな標識。判子のように四角い。
 */
function Tag({
  variant = 'default',
  children,
  style,
  ...rest
}) {
  const variants = {
    default: {
      background: 'transparent',
      color: 'var(--ink-600)',
      border: '1px solid var(--ink-300)'
    },
    solid: {
      background: 'var(--sumi)',
      color: 'var(--paper)',
      border: '1px solid var(--sumi)'
    },
    accent: {
      background: 'transparent',
      color: 'var(--shu-600)',
      border: '1px solid var(--shu-500)'
    },
    seal: {
      background: 'var(--shu-500)',
      color: 'var(--paper)',
      border: '1px solid var(--shu-500)'
    },
    muted: {
      background: 'var(--paper-deep)',
      color: 'var(--ink-500)',
      border: '1px solid transparent'
    }
  };
  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1,
    padding: '5px 10px',
    borderRadius: 'var(--radius-sm)',
    whiteSpace: 'nowrap',
    ...(variants[variant] || variants.default),
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: composed
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/cards/MemorialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — MemorialCard / 墓碑カード
 * 亡くなった事業を悼む一基の墓碑。アーカイブの中核。
 * variant: stone(既定の銘板) / monument(墨地の大墓標) / index(一覧の一行)
 */
function MemorialCard({
  name,
  nameLatin,
  industry,
  founded,
  died,
  cause,
  epitaph,
  number,
  variant = 'stone',
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lifespan = founded != null && died != null ? `${founded} — ${died}` : null;
  const age = founded != null && died != null ? died - founded : null;
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick
  };
  const Tag_ = href ? 'a' : 'div';
  const interactive = !!(href || onClick);
  const baseLink = {
    href,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    cursor: interactive ? 'pointer' : 'default'
  };

  // —— INDEX: 一覧の一行 ——
  if (variant === 'index') {
    return /*#__PURE__*/React.createElement(Tag_, _extends({}, baseLink, handlers, rest, {
      style: {
        ...baseLink,
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        alignItems: 'center',
        gap: '20px',
        padding: '18px 8px',
        borderBottom: '1px solid var(--ink-200)',
        background: hover && interactive ? 'var(--paper-raised)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-standard)',
        ...style
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }
    }, number || '—'), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '14px',
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '20px',
        color: hover && interactive ? 'var(--shu-600)' : 'var(--sumi)',
        transition: 'color var(--dur-fast)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, name), lifespan && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap'
      }
    }, lifespan)), cause && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
      variant: "accent"
    }, cause));
  }

  // —— MONUMENT: 墨地の大墓標 ——
  const isMonument = variant === 'monument';
  const surface = isMonument ? 'var(--sumi)' : 'var(--paper-raised)';
  const fg = isMonument ? 'var(--paper)' : 'var(--sumi)';
  const fgMuted = isMonument ? 'var(--ink-300)' : 'var(--text-muted)';
  const topRule = hover && interactive ? 'var(--shu-500)' : isMonument ? 'var(--shu-500)' : 'var(--sumi)';
  return /*#__PURE__*/React.createElement(Tag_, _extends({}, baseLink, handlers, rest, {
    style: {
      ...baseLink,
      position: 'relative',
      background: surface,
      borderTop: `3px solid ${topRule}`,
      padding: isMonument ? '32px 30px 28px' : '24px 24px 22px',
      boxShadow: interactive && hover ? 'var(--shadow-raised)' : 'var(--shadow-card)',
      transform: interactive && hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      borderRadius: 'var(--radius-sm)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: isMonument ? '18px' : '14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-micro)',
      letterSpacing: '0.14em',
      color: fgMuted
    }
  }, number ? `NO. ${number}` : 'R.I.P.'), cause && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: isMonument ? 'seal' : 'accent'
  }, cause)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: isMonument ? 900 : 700,
      fontSize: isMonument ? '34px' : '26px',
      lineHeight: 1.2,
      letterSpacing: 'var(--ls-tight)',
      color: hover && interactive && !isMonument ? 'var(--shu-700)' : fg,
      transition: 'color var(--dur-base)'
    }
  }, name), nameLatin && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-latin)',
      fontStyle: 'italic',
      fontSize: '15px',
      color: fgMuted,
      marginTop: '4px'
    }
  }, nameLatin), lifespan && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px',
      marginTop: '14px',
      paddingTop: '14px',
      borderTop: `1px solid ${isMonument ? 'var(--ink-700)' : 'var(--ink-200)'}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: isMonument ? '20px' : '16px',
      color: fg,
      fontVariantNumeric: 'tabular-nums'
    }
  }, founded, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--shu-500)'
    }
  }, "\u2014"), " ", died), age != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      color: fgMuted
    }
  }, "\u4EAB\u5E74 ", age, "\u5E74")), industry && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: isMonument ? 'muted' : 'default'
  }, industry)), epitaph && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '16px',
      fontFamily: 'var(--font-serif)',
      fontSize: '15px',
      lineHeight: 1.85,
      color: isMonument ? 'var(--ink-200)' : 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, epitaph));
}
Object.assign(__ds_scope, { MemorialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MemorialCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — FilterChip
 * 業種・年代・死因で墓場を絞る四角いチップ。
 */
function FilterChip({
  active = false,
  children,
  count,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1,
    padding: '9px 14px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
    border: '1px solid var(--ink-300)',
    background: 'transparent',
    color: 'var(--ink-600)'
  };
  const activeStyle = {
    background: 'var(--sumi)',
    borderColor: 'var(--sumi)',
    color: 'var(--paper)'
  };
  const hoverStyle = {
    borderColor: 'var(--sumi)',
    color: 'var(--sumi)'
  };
  const composed = {
    ...base,
    ...(active ? activeStyle : hover ? hoverStyle : null),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-pressed": active,
    style: composed
  }, rest), children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: active ? 'var(--shu-400)' : 'var(--text-muted)'
    }
  }, count));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KEIEI.RIP — SearchField
 * 墓場を掘る検索。下罫線だけの編集的な入力。
 */
function SearchField({
  value,
  onChange,
  onSubmit,
  placeholder = '社名・業種で墓場を探す',
  size = 'md',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    md: {
      fontSize: '17px',
      pad: '10px 0'
    },
    lg: {
      fontSize: '22px',
      pad: '14px 0'
    }
  };
  const h = heights[size] || heights.md;
  return /*#__PURE__*/React.createElement("form", _extends({
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderBottom: `1.5px solid ${focus ? 'var(--shu-500)' : 'var(--sumi)'}`,
      transition: 'border-color var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: focus ? 'var(--shu-500)' : 'var(--text-muted)',
      letterSpacing: '0.1em'
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-serif)',
      fontSize: h.fontSize,
      color: 'var(--sumi)',
      padding: h.pad,
      minWidth: 0
    }
  }));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/App.jsx
try { (() => {
/* KEIEI.RIP — app shell / router */
function App() {
  const [route, setRoute] = React.useState({
    name: 'home',
    data: null
  });
  const open = React.useCallback(d => {
    window.scrollTo(0, 0);
    setRoute({
      name: 'case',
      data: d
    });
  }, []);
  const home = React.useCallback(() => {
    window.scrollTo(0, 0);
    setRoute({
      name: 'home',
      data: null
    });
  }, []);
  React.useEffect(() => {
    window.__open = open;
  }, [open]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SiteHeader, {
    onHome: home
  }), route.name === 'home' ? /*#__PURE__*/React.createElement(HomeArchive, {
    onOpen: open
  }) : /*#__PURE__*/React.createElement(CaseDetail, {
    data: route.data,
    onBack: home
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/CaseDetail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* KEIEI.RIP — Case detail (one grave) */
function CaseDetail({
  data,
  onBack
}) {
  const age = data.died - data.founded;
  const stats = data.stats || [{
    value: age,
    unit: '年',
    label: '営業年数'
  }];
  const story = data.story || [data.epitaph];
  const related = window.KEIEI_DATA.filter(d => d.number !== data.number && !d.featured).slice(0, 3);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sumi)',
      color: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      padding: '40px 40px 56px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '.14em',
      color: 'var(--ink-300)',
      textTransform: 'uppercase',
      marginBottom: 40
    }
  }, "\u2190 Back to Archive"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      letterSpacing: '.14em',
      color: 'var(--shu-400)'
    }
  }, "NO. ", data.number), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      flex: 1,
      background: 'var(--ink-700)'
    }
  }), /*#__PURE__*/React.createElement(Tag, {
    variant: "seal"
  }, data.cause)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(36px, 5vw, 60px)',
      lineHeight: 1.18,
      letterSpacing: '-.02em',
      margin: 0
    }
  }, data.name), data.nameLatin && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-latin)',
      fontStyle: 'italic',
      fontSize: 19,
      color: 'var(--ink-300)',
      marginTop: 10
    }
  }, data.nameLatin), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      fontVariantNumeric: 'tabular-nums'
    }
  }, data.founded, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--shu-400)'
    }
  }, "\u2014"), " ", data.died), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--ink-300)'
    }
  }, "\u4EAB\u5E74 ", age, "\u5E74 \xB7 ", data.industry)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      padding: '48px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      gap: 36
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement(StatPlaque, _extends({
    key: i
  }, s))))), /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '56px 40px 0'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    kicker: "Obituary",
    title: "\u5F14\u8F9E"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, story.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      lineHeight: 2.0,
      color: 'var(--text-primary)',
      marginBottom: 24,
      textWrap: 'pretty'
    }
  }, p))), data.lastWords && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '40px 0'
    }
  }, /*#__PURE__*/React.createElement(Quote, {
    cite: data.lastWords.cite,
    source: data.lastWords.source
  }, data.lastWords.text))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '64px 40px 0'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "\u2014",
    kicker: "Nearby Graves",
    title: "\u96A3\u306E\u5893\u6A19"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginTop: 32
    }
  }, related.map(d => /*#__PURE__*/React.createElement(MemorialCard, _extends({
    key: d.number
  }, d, {
    onClick: () => {
      window.scrollTo(0, 0);
      window.__open(d);
    }
  }))))), /*#__PURE__*/React.createElement(SiteFooter, null));
}
window.CaseDetail = CaseDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/CaseDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/HomeArchive.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* KEIEI.RIP — Home / Archive */
function HomeArchive({
  onOpen
}) {
  const data = window.KEIEI_DATA;
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const featured = data.find(d => d.featured);
  const filters = [['all', 'すべて', null], ['書店', '書店', null], ['飲食', '飲食', null], ['洋食', '洋食', null], ['製造', '製造', null], ['小売', '小売', null], ['IT', 'IT', null]];
  let rows = data.filter(d => !d.featured);
  if (filter !== 'all') rows = rows.filter(d => d.industry === filter);
  if (q.trim()) rows = rows.filter(d => (d.name + (d.industry || '') + (d.cause || '')).includes(q.trim()));
  const counts = {};
  data.forEach(d => {
    counts[d.industry] = (counts[d.industry] || 0) + 1;
  });
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '88px 40px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--shu-500)',
      marginBottom: 28
    }
  }, "\u7D4C\u55B6\u306E\u5893\u5834 \u2014 An Archive of Fallen Businesses"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 'clamp(40px, 6vw, 76px)',
      lineHeight: 1.18,
      letterSpacing: '-.02em',
      color: 'var(--sumi)',
      margin: 0,
      maxWidth: '16em'
    }
  }, "\u5012\u308C\u305F\u4E8B\u696D\u306B\u3001", /*#__PURE__*/React.createElement("br", null), "\u5F14\u3044\u3068\u3001\u656C\u610F\u3092\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      lineHeight: 1.9,
      color: 'var(--text-secondary)',
      maxWidth: '34em',
      marginTop: 28
    }
  }, "\u3053\u3053\u306F\u3001\u6F70\u3048\u305F\u4E8B\u696D\u306E\u5893\u5834\u3067\u3059\u3002\u5931\u6557\u306F\u3001\u6311\u3093\u3060\u8005\u306B\u3057\u304B\u8A2A\u308C\u306A\u3044\u3002\u6557\u308C\u3066\u306A\u304A\u524D\u3092\u5411\u3044\u305F\u4E8B\u696D\u8005\u305F\u3061\u306E\u8A18\u9332\u3092\u3001\u3072\u3068\u3064\u305A\u3064\u523B\u3093\u3067\u3044\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: setQ,
    size: "lg"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sumi)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '52px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(StatPlaque, {
    onDark: true,
    value: data.length,
    unit: "\u57FA",
    label: "\u57CB\u846C\u3055\u308C\u305F\u4E8B\u696D",
    accent: true
  }), /*#__PURE__*/React.createElement(StatPlaque, {
    onDark: true,
    value: "49",
    unit: "\u5E74",
    label: "\u6700\u3082\u9577\u304F\u751F\u304D\u305F\u4E8B\u696D"
  }), /*#__PURE__*/React.createElement(StatPlaque, {
    onDark: true,
    value: "12",
    unit: "\u696D\u7A2E",
    label: "\u7720\u308B\u696D\u7A2E"
  }), /*#__PURE__*/React.createElement(StatPlaque, {
    onDark: true,
    value: "1923",
    label: "\u6700\u53E4\u306E\u5275\u696D\u5E74",
    sub: "EST."
  }))), featured && /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '72px 40px 0'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "00",
    kicker: "This Month's Grave",
    title: "\u4ECA\u6708\u306E\u5893\u6A19"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 40,
      marginTop: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(MemorialCard, _extends({
    variant: "monument"
  }, featured, {
    onClick: () => onOpen(featured)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Quote, {
    cite: "\u4E8C\u4EE3\u76EE\u5E97\u4E3B",
    source: "\u9589\u5E97\u306E\u65E5\u306B"
  }, featured.lastWords.text), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.95,
      color: 'var(--text-secondary)',
      marginTop: 28
    }
  }, featured.story[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onOpen(featured)
  }, "\u5F14\u8F9E\u3092\u8AAD\u3080"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '72px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "01",
    kicker: "The Archive",
    title: "\u5893\u7891\u3092\u3081\u3050\u308B"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      margin: '28px 0 36px'
    }
  }, filters.map(([k, label]) => /*#__PURE__*/React.createElement(FilterChip, {
    key: k,
    active: filter === k,
    count: k === 'all' ? data.length - 1 : counts[k],
    onClick: () => setFilter(k)
  }, label))), rows.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, rows.map(d => /*#__PURE__*/React.createElement(MemorialCard, _extends({
    key: d.number
  }, d, {
    onClick: () => onOpen(d)
  })))) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      color: 'var(--text-muted)',
      padding: '40px 0'
    }
  }, "\u8A72\u5F53\u3059\u308B\u5893\u7891\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002")), /*#__PURE__*/React.createElement(SiteFooter, null));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--ink-200)',
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '48px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 30,
    char: "\u5352",
    outline: true
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: 22
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "REST IN PEACE, AMBITION. \u2014 \xA9 KEIEI.RIP")));
}
window.HomeArchive = HomeArchive;
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/HomeArchive.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/SiteHeader.jsx
try { (() => {
/* KEIEI.RIP — site header */
function SiteHeader({
  onHome
}) {
  const links = ['アーカイブ', '業種別', '弔辞', '寄稿する'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(244,240,231,0.88)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--ink-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 40px',
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onHome,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Seal, {
    size: 34
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: 26
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      color: i === 0 ? 'var(--sumi)' : 'var(--ink-600)',
      letterSpacing: '.02em'
    }
  }, l)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.16em',
      color: 'var(--shu-500)',
      textTransform: 'uppercase'
    }
  }, "R.I.P."))));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* KEIEI.RIP UI kit — local primitives (mirror the DS components, token-driven) */
const {
  useState
} = React;
function Seal({
  size = 40,
  char = '経',
  outline = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-seal)',
      background: outline ? 'transparent' : 'var(--shu-500)',
      border: outline ? '2.5px solid var(--shu-500)' : 'none',
      boxShadow: outline ? 'none' : 'var(--shadow-seal)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      lineHeight: 1,
      fontSize: size * 0.56,
      color: outline ? 'var(--shu-500)' : 'var(--paper)'
    }
  }, char));
}
function Wordmark({
  size = 26,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-latin)',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '.005em',
      color: onDark ? 'var(--paper)' : 'var(--sumi)',
      display: 'inline-flex',
      alignItems: 'baseline'
    }
  }, "KEIEI", /*#__PURE__*/React.createElement("span", {
    style: {
      color: onDark ? 'var(--shu-400)' : 'var(--shu-500)'
    }
  }, ".RIP"));
}
function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  ...rest
}) {
  const [h, setH] = useState(false),
    [p, setP] = useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 13
    },
    md: {
      padding: '12px 24px',
      fontSize: 15
    },
    lg: {
      padding: '16px 32px',
      fontSize: 17
    }
  };
  const pal = {
    primary: {
      base: {
        background: 'var(--shu-500)',
        color: 'var(--paper)',
        border: '1.5px solid var(--shu-500)'
      },
      hover: {
        background: 'var(--shu-600)',
        borderColor: 'var(--shu-600)'
      },
      press: {
        background: 'var(--shu-700)'
      }
    },
    secondary: {
      base: {
        background: 'transparent',
        color: 'var(--sumi)',
        border: '1.5px solid var(--sumi)'
      },
      hover: {
        background: 'var(--sumi)',
        color: 'var(--paper)'
      },
      press: {}
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--sumi)',
        border: '1.5px solid transparent'
      },
      hover: {
        color: 'var(--shu-500)'
      },
      press: {}
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      letterSpacing: '.02em',
      lineHeight: 1,
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      transition: 'all var(--dur-fast) var(--ease-standard)',
      transform: p ? 'translateY(1px)' : 'none',
      ...sizes[size],
      ...pal.base,
      ...(h ? pal.hover : null),
      ...(p ? pal.press : null),
      ...style
    }
  }, rest), children);
}
function Tag({
  variant = 'default',
  children,
  style
}) {
  const v = {
    default: {
      background: 'transparent',
      color: 'var(--ink-600)',
      border: '1px solid var(--ink-300)'
    },
    solid: {
      background: 'var(--sumi)',
      color: 'var(--paper)',
      border: '1px solid var(--sumi)'
    },
    accent: {
      background: 'transparent',
      color: 'var(--shu-600)',
      border: '1px solid var(--shu-500)'
    },
    seal: {
      background: 'var(--shu-500)',
      color: 'var(--paper)',
      border: '1px solid var(--shu-500)'
    },
    muted: {
      background: 'var(--paper-deep)',
      color: 'var(--ink-500)',
      border: '1px solid transparent'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '.02em',
      lineHeight: 1,
      padding: '5px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    }
  }, children);
}
function FilterChip({
  active,
  count,
  children,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1,
      padding: '9px 14px',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      transition: 'all var(--dur-fast) var(--ease-standard)',
      border: `1px solid ${active ? 'var(--sumi)' : h ? 'var(--sumi)' : 'var(--ink-300)'}`,
      background: active ? 'var(--sumi)' : 'transparent',
      color: active ? 'var(--paper)' : h ? 'var(--sumi)' : 'var(--ink-600)'
    }
  }, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: active ? 'var(--shu-400)' : 'var(--text-muted)'
    }
  }, count));
}
function SearchField({
  value,
  onChange,
  placeholder = '社名・業種で墓場を探す',
  size = 'md'
}) {
  const [f, setF] = useState(false);
  const fs = size === 'lg' ? 22 : 17,
    pad = size === 'lg' ? '14px 0' : '10px 0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      borderBottom: `1.5px solid ${f ? 'var(--shu-500)' : 'var(--sumi)'}`,
      transition: 'border-color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      color: f ? 'var(--shu-500)' : 'var(--text-muted)'
    }
  }, "\u2315"), /*#__PURE__*/React.createElement("input", {
    type: "search",
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-serif)',
      fontSize: fs,
      color: 'var(--sumi)',
      padding: pad,
      minWidth: 0
    }
  }));
}
function SectionLabel({
  kicker,
  title,
  number,
  align = 'left',
  onDark = false
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)',
    muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)',
    rule = onDark ? 'var(--ink-700)' : 'var(--sumi)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--shu-500)',
      marginBottom: 10
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      color: muted
    }
  }, number), kicker && /*#__PURE__*/React.createElement("span", null, kicker)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.15,
      letterSpacing: '-.01em',
      color: ink,
      margin: 0,
      paddingBottom: 16,
      borderBottom: `1.5px solid ${rule}`
    }
  }, title));
}
function Quote({
  children,
  cite,
  source,
  onDark = false
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)',
    muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      paddingLeft: 24,
      borderLeft: '3px solid var(--shu-500)'
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1.6,
      letterSpacing: '-.01em',
      color: ink,
      textWrap: 'pretty'
    }
  }, children), (cite || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: muted
    }
  }, cite && /*#__PURE__*/React.createElement("span", {
    style: {
      color: ink,
      fontWeight: 600
    }
  }, cite), cite && source && /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px',
      color: 'var(--shu-500)'
    }
  }, "\u2014"), source && /*#__PURE__*/React.createElement("span", null, source)));
}
function StatPlaque({
  value,
  unit,
  label,
  sub,
  align = 'left',
  onDark = false,
  accent = false
}) {
  const ink = onDark ? 'var(--paper)' : 'var(--sumi)',
    muted = onDark ? 'var(--ink-300)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: 40,
      lineHeight: 1,
      letterSpacing: '-.02em',
      color: accent ? 'var(--shu-500)' : ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 700,
      color: muted
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 8,
      borderTop: `1px solid ${onDark ? 'var(--ink-700)' : 'var(--ink-200)'}`,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      color: ink
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.06em',
      color: muted
    }
  }, sub));
}
function MemorialCard({
  name,
  nameLatin,
  industry,
  founded,
  died,
  cause,
  epitaph,
  number,
  variant = 'stone',
  onClick
}) {
  const [h, setH] = useState(false);
  const lifespan = founded != null && died != null ? `${founded} — ${died}` : null;
  const age = founded != null && died != null ? died - founded : null;
  const click = {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      cursor: 'pointer'
    }
  };
  if (variant === 'index') {
    return /*#__PURE__*/React.createElement("div", _extends({}, click, {
      style: {
        ...click.style,
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        alignItems: 'center',
        gap: 20,
        padding: '18px 8px',
        borderBottom: '1px solid var(--ink-200)',
        background: h ? 'var(--paper-raised)' : 'transparent',
        transition: 'background var(--dur-fast)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, number || '—'), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 14,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 20,
        color: h ? 'var(--shu-600)' : 'var(--sumi)',
        transition: 'color var(--dur-fast)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, name), lifespan && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap'
      }
    }, lifespan)), cause && /*#__PURE__*/React.createElement(Tag, {
      variant: "accent"
    }, cause));
  }
  const mon = variant === 'monument';
  const fg = mon ? 'var(--paper)' : 'var(--sumi)',
    fgMuted = mon ? 'var(--ink-300)' : 'var(--text-muted)';
  const topRule = h ? 'var(--shu-500)' : mon ? 'var(--shu-500)' : 'var(--sumi)';
  return /*#__PURE__*/React.createElement("div", _extends({}, click, {
    style: {
      ...click.style,
      position: 'relative',
      background: mon ? 'var(--sumi)' : 'var(--paper-raised)',
      borderTop: `3px solid ${topRule}`,
      padding: mon ? '32px 30px 28px' : '24px 24px 22px',
      boxShadow: h ? 'var(--shadow-raised)' : 'var(--shadow-card)',
      transform: h ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base)',
      borderRadius: 'var(--radius-sm)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: mon ? 18 : 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      color: fgMuted
    }
  }, number ? `NO. ${number}` : 'R.I.P.'), cause && /*#__PURE__*/React.createElement(Tag, {
    variant: mon ? 'seal' : 'accent'
  }, cause)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: mon ? 900 : 700,
      fontSize: mon ? 34 : 26,
      lineHeight: 1.2,
      letterSpacing: '-.01em',
      color: h && !mon ? 'var(--shu-700)' : fg,
      transition: 'color var(--dur-base)'
    }
  }, name), nameLatin && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-latin)',
      fontStyle: 'italic',
      fontSize: 15,
      color: fgMuted,
      marginTop: 4
    }
  }, nameLatin), lifespan && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginTop: 14,
      paddingTop: 14,
      borderTop: `1px solid ${mon ? 'var(--ink-700)' : 'var(--ink-200)'}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: mon ? 20 : 16,
      color: fg,
      fontVariantNumeric: 'tabular-nums'
    }
  }, founded, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--shu-500)'
    }
  }, "\u2014"), " ", died), age != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: fgMuted
    }
  }, "\u4EAB\u5E74 ", age, "\u5E74")), industry && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: mon ? 'muted' : 'default'
  }, industry)), epitaph && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      lineHeight: 1.85,
      color: mon ? 'var(--ink-200)' : 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, epitaph));
}
Object.assign(window, {
  Seal,
  Wordmark,
  Button,
  Tag,
  FilterChip,
  SearchField,
  SectionLabel,
  Quote,
  StatPlaque,
  MemorialCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keiei_rip/data.js
try { (() => {
/* KEIEI.RIP — sample archive data (架空の事業者) */
window.KEIEI_DATA = [{
  number: '0001',
  name: '月光堂書店',
  nameLatin: 'Gekkodo Books',
  industry: '書店',
  founded: 1952,
  died: 2016,
  cause: '商店街の衰退',
  featured: true,
  epitaph: '三代続いた町の本屋。最後の客は、初代を知る老人だった。',
  story: ['駅前の商店街に灯りをともし続けた小さな書店だった。棚の高さは初代店主の背丈に合わせてつくられ、半世紀のあいだ一度も変わらなかった。', '大型店とネット書店が町の外側に増えていく。それでも常連客のために、取り寄せの注文票だけは最後まで手書きで残した。', '閉店を告げる貼り紙の前で、二代目はこう言った。「本を売るのではなく、本を待つ時間を売っていたのだと、辞めてから気づいた」。'],
  stats: [{
    value: '64',
    unit: '年',
    label: '営業年数'
  }, {
    value: '3',
    unit: '代',
    label: '受け継いだ店主',
    accent: true
  }, {
    value: '12',
    unit: '万冊',
    label: '生涯の取扱点数'
  }],
  lastWords: {
    text: '本を待つ時間を、売っていたのかもしれない。',
    cite: '二代目店主',
    source: '閉店の日に'
  }
}, {
  number: '0427',
  name: '株式会社 暁印刷',
  nameLatin: 'Akatsuki Printing',
  industry: '印刷',
  founded: 1976,
  died: 2009,
  cause: '設備投資過剰',
  epitaph: '活版からオフセットへ。時代の速さに、設備の借入が追いつかなかった。',
  story: ['創業者は活版の職人だった。オフセット、そしてオンデマンドへ——技術の波が来るたびに、最新の機械を入れた。', '機械は速くなった。だが返済はそれ以上に速かった。最後の輪転機が刷ったのは、自社の廃業通知だった。'],
  stats: [{
    value: '33',
    unit: '年',
    label: '営業年数'
  }, {
    value: '4.8',
    unit: '億円',
    label: '設備投資総額',
    accent: true
  }, {
    value: '17',
    unit: '名',
    label: '最後の従業員数'
  }],
  lastWords: {
    text: '新しい機械は、いつも正しかった。早すぎただけだ。',
    cite: '創業者',
    source: '債権者集会にて'
  }
}, {
  number: '0428',
  name: 'グリル燕',
  industry: '洋食',
  founded: 1988,
  died: 2018,
  cause: '後継者不在',
  epitaph: 'デミグラスのレシピは、誰にも渡されないまま鍋ごと処分された。',
  stats: [{
    value: '30',
    unit: '年',
    label: '営業年数'
  }, {
    value: '1',
    unit: '皿',
    label: '看板メニュー',
    accent: true
  }]
}, {
  number: '0429',
  name: '有限会社 北辰精工',
  industry: '製造',
  founded: 1971,
  died: 2011,
  cause: '取引先倒産',
  epitaph: '町工場の精度は世界一だった。発注元が一社だったことを除けば。',
  stats: [{
    value: '40',
    unit: '年',
    label: '営業年数'
  }, {
    value: '1',
    unit: '社',
    label: '主要取引先',
    accent: true
  }]
}, {
  number: '0430',
  name: 'スナック 灯',
  industry: '飲食',
  founded: 1979,
  died: 2020,
  cause: 'コロナ禍',
  epitaph: 'ママは最後の夜も、開けていない店のために氷を作っていた。',
  stats: [{
    value: '41',
    unit: '年',
    label: '営業年数'
  }, {
    value: '0',
    unit: '日',
    label: '最後の月の営業',
    accent: true
  }]
}, {
  number: '0431',
  name: 'みなと写真館',
  industry: '写真',
  founded: 1964,
  died: 2014,
  cause: 'デジタル化',
  epitaph: '七五三も成人式も、町の節目はすべてここで止まっていた。',
  stats: [{
    value: '50',
    unit: '年',
    label: '営業年数'
  }, {
    value: '8',
    unit: '万人',
    label: '撮影した人数',
    accent: true
  }]
}, {
  number: '0432',
  name: '旭湯',
  industry: '銭湯',
  founded: 1948,
  died: 2007,
  cause: '燃料費高騰',
  epitaph: '番台の主は、最後の客が出るまで湯を落とさなかった。',
  stats: [{
    value: '59',
    unit: '年',
    label: '営業年数'
  }, {
    value: '42',
    unit: '℃',
    label: '変わらぬ湯温',
    accent: true
  }]
}, {
  number: '0433',
  name: 'レンタルビデオ つばさ',
  industry: '小売',
  founded: 1991,
  died: 2013,
  cause: '配信の普及',
  epitaph: '延滞料の督促はがきが、最後の手紙になった。',
  stats: [{
    value: '22',
    unit: '年',
    label: '営業年数'
  }, {
    value: '3.4',
    unit: '万本',
    label: '在庫タイトル',
    accent: true
  }]
}, {
  number: '0434',
  name: '城北自動車学校',
  industry: '教育',
  founded: 1967,
  died: 2019,
  cause: '少子化',
  epitaph: '坂道発進を教えた教官は、最後にこの町を出る生徒を見送った。',
  stats: [{
    value: '52',
    unit: '年',
    label: '営業年数'
  }, {
    value: '6.1',
    unit: '万人',
    label: '送り出した卒業生',
    accent: true
  }]
}, {
  number: '0435',
  name: '喫茶 ロマン',
  industry: '喫茶',
  founded: 1972,
  died: 2015,
  cause: '再開発',
  epitaph: '同じ席で四十年通った客がいた。ビルは、その席ごと消えた。',
  stats: [{
    value: '43',
    unit: '年',
    label: '営業年数'
  }, {
    value: '1',
    unit: '席',
    label: '常連の指定席',
    accent: true
  }]
}, {
  number: '0436',
  name: '山田屋呉服店',
  industry: '呉服',
  founded: 1923,
  died: 2003,
  cause: '生活様式の変化',
  epitaph: '嫁入りの着物を仕立てた家が、三軒先まで途切れた。',
  stats: [{
    value: '80',
    unit: '年',
    label: '営業年数'
  }, {
    value: '3',
    unit: '代',
    label: '受け継いだ主',
    accent: true
  }]
}, {
  number: '0437',
  name: 'テクノソフト',
  nameLatin: 'TechnoSoft',
  industry: 'IT',
  founded: 1998,
  died: 2008,
  cause: '資金繰り',
  epitaph: '時代の二歩先を行った。資金は半歩しか、ついてこなかった。',
  stats: [{
    value: '10',
    unit: '年',
    label: '営業年数'
  }, {
    value: '2',
    unit: '歩',
    label: '時代の先',
    accent: true
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keiei_rip/data.js", error: String((e && e.message) || e) }); }

__ds_ns.MemorialCard = __ds_scope.MemorialCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.StatPlaque = __ds_scope.StatPlaque;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.SearchField = __ds_scope.SearchField;

})();
