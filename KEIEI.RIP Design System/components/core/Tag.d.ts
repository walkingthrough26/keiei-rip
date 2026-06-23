import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** default(墨枠) / solid(墨) / accent(朱枠) / seal(朱地) / muted(沈んだ紙) */
  variant?: 'default' | 'solid' | 'accent' | 'seal' | 'muted';
  children?: React.ReactNode;
}

/** 業種・死因・年代などのメタを示す四角い標識。 */
export function Tag(props: TagProps): JSX.Element;
