import * as React from 'react';

export interface MemorialCardProps {
  /** 社名・事業名 */
  name: React.ReactNode;
  /** ローマ字/英語表記（任意） */
  nameLatin?: string;
  /** 業種 */
  industry?: string;
  /** 創業年 */
  founded?: number;
  /** 廃業年 */
  died?: number;
  /** 死因（資金繰り・過剰拡大・etc） */
  cause?: string;
  /** 弔辞・一言 */
  epitaph?: React.ReactNode;
  /** 墓碑番号 */
  number?: string;
  /** stone(銘板) / monument(墨地の大墓標) / index(一覧の一行) */
  variant?: 'stone' | 'monument' | 'index';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * 亡くなった事業を悼む一基の墓碑。KEIEI.RIP アーカイブの中核。
 * @startingPoint section="Archive" subtitle="墓碑カード — stone / monument / index" viewport="380x340"
 */
export function MemorialCard(props: MemorialCardProps): JSX.Element;
