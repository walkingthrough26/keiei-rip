import * as React from 'react';

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** 件数（任意, mono で右に） */
  count?: number;
  children?: React.ReactNode;
}

/** 業種・年代・死因で墓場を絞る四角いトグルチップ。 */
export function FilterChip(props: FilterChipProps): JSX.Element;
