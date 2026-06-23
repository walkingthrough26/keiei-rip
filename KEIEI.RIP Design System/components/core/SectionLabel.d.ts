import * as React from 'react';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** English / mono kicker above the title, e.g. "ARCHIVE" */
  kicker?: string;
  /** 和文見出し */
  title: React.ReactNode;
  /** Section number, e.g. "01" */
  number?: string;
  align?: 'left' | 'center';
  /** 墨地のバンド上で使う場合 true */
  onDark?: boolean;
}

/** 英文キッカー＋和文見出し＋罫線で編集的セクションを開く。 */
export function SectionLabel(props: SectionLabelProps): JSX.Element;
