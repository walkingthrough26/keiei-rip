import * as React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** 朱の主ボタン / 墨の枠線 / 余白に溶けるゴースト */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element (e.g. 'a'); set `href` to auto-render an anchor */
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * 行動を促す主要ボタン。朱赤は「進む」決断にのみ使う。
 * @startingPoint section="Core" subtitle="朱 / 墨 / ゴーストの3バリアント" viewport="700x160"
 */
export function Button(props: ButtonProps): JSX.Element;
