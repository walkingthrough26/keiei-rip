import * as React from 'react';

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** 発言者・故人名 */
  cite?: string;
  /** 出典・肩書き */
  source?: string;
  onDark?: boolean;
}

/** 大きな明朝の引用・弔辞ブロック。朱の縦罫付き。 */
export function Quote(props: QuoteProps): JSX.Element;
