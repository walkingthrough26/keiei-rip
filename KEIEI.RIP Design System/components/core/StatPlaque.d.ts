import * as React from 'react';

export interface StatPlaqueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure (mono, tabular) */
  value: React.ReactNode;
  /** Unit suffix, e.g. "年" "店" "億円" */
  unit?: string;
  /** 和文ラベル */
  label: React.ReactNode;
  /** mono sub-caption */
  sub?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
  /** 朱で数字を強調 */
  accent?: boolean;
}

/** 数字の銘板。享年・店舗数・負債などの記録に。 */
export function StatPlaque(props: StatPlaqueProps): JSX.Element;
