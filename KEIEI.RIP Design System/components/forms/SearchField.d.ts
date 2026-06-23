import * as React from 'react';

export interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}

/** 下罫線だけの編集的な検索入力。墓場を掘る。 */
export function SearchField(props: SearchFieldProps): JSX.Element;
