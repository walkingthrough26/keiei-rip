/* KEIEI.RIP — sample archive data (架空の事業者) */
window.KEIEI_DATA = [
  {
    number: '0001', name: '月光堂書店', nameLatin: 'Gekkodo Books', industry: '書店',
    founded: 1952, died: 2016, cause: '商店街の衰退', featured: true,
    epitaph: '三代続いた町の本屋。最後の客は、初代を知る老人だった。',
    story: [
      '駅前の商店街に灯りをともし続けた小さな書店だった。棚の高さは初代店主の背丈に合わせてつくられ、半世紀のあいだ一度も変わらなかった。',
      '大型店とネット書店が町の外側に増えていく。それでも常連客のために、取り寄せの注文票だけは最後まで手書きで残した。',
      '閉店を告げる貼り紙の前で、二代目はこう言った。「本を売るのではなく、本を待つ時間を売っていたのだと、辞めてから気づいた」。'
    ],
    stats: [
      { value: '64', unit: '年', label: '営業年数' },
      { value: '3', unit: '代', label: '受け継いだ店主', accent: true },
      { value: '12', unit: '万冊', label: '生涯の取扱点数' }
    ],
    lastWords: { text: '本を待つ時間を、売っていたのかもしれない。', cite: '二代目店主', source: '閉店の日に' }
  },
  {
    number: '0427', name: '株式会社 暁印刷', nameLatin: 'Akatsuki Printing', industry: '印刷',
    founded: 1976, died: 2009, cause: '設備投資過剰',
    epitaph: '活版からオフセットへ。時代の速さに、設備の借入が追いつかなかった。',
    story: [
      '創業者は活版の職人だった。オフセット、そしてオンデマンドへ——技術の波が来るたびに、最新の機械を入れた。',
      '機械は速くなった。だが返済はそれ以上に速かった。最後の輪転機が刷ったのは、自社の廃業通知だった。'
    ],
    stats: [
      { value: '33', unit: '年', label: '営業年数' },
      { value: '4.8', unit: '億円', label: '設備投資総額', accent: true },
      { value: '17', unit: '名', label: '最後の従業員数' }
    ],
    lastWords: { text: '新しい機械は、いつも正しかった。早すぎただけだ。', cite: '創業者', source: '債権者集会にて' }
  },
  { number: '0428', name: 'グリル燕', industry: '洋食', founded: 1988, died: 2018, cause: '後継者不在',
    epitaph: 'デミグラスのレシピは、誰にも渡されないまま鍋ごと処分された。',
    stats: [{ value: '30', unit: '年', label: '営業年数' }, { value: '1', unit: '皿', label: '看板メニュー', accent: true }] },
  { number: '0429', name: '有限会社 北辰精工', industry: '製造', founded: 1971, died: 2011, cause: '取引先倒産',
    epitaph: '町工場の精度は世界一だった。発注元が一社だったことを除けば。',
    stats: [{ value: '40', unit: '年', label: '営業年数' }, { value: '1', unit: '社', label: '主要取引先', accent: true }] },
  { number: '0430', name: 'スナック 灯', industry: '飲食', founded: 1979, died: 2020, cause: 'コロナ禍',
    epitaph: 'ママは最後の夜も、開けていない店のために氷を作っていた。',
    stats: [{ value: '41', unit: '年', label: '営業年数' }, { value: '0', unit: '日', label: '最後の月の営業', accent: true }] },
  { number: '0431', name: 'みなと写真館', industry: '写真', founded: 1964, died: 2014, cause: 'デジタル化',
    epitaph: '七五三も成人式も、町の節目はすべてここで止まっていた。',
    stats: [{ value: '50', unit: '年', label: '営業年数' }, { value: '8', unit: '万人', label: '撮影した人数', accent: true }] },
  { number: '0432', name: '旭湯', industry: '銭湯', founded: 1948, died: 2007, cause: '燃料費高騰',
    epitaph: '番台の主は、最後の客が出るまで湯を落とさなかった。',
    stats: [{ value: '59', unit: '年', label: '営業年数' }, { value: '42', unit: '℃', label: '変わらぬ湯温', accent: true }] },
  { number: '0433', name: 'レンタルビデオ つばさ', industry: '小売', founded: 1991, died: 2013, cause: '配信の普及',
    epitaph: '延滞料の督促はがきが、最後の手紙になった。',
    stats: [{ value: '22', unit: '年', label: '営業年数' }, { value: '3.4', unit: '万本', label: '在庫タイトル', accent: true }] },
  { number: '0434', name: '城北自動車学校', industry: '教育', founded: 1967, died: 2019, cause: '少子化',
    epitaph: '坂道発進を教えた教官は、最後にこの町を出る生徒を見送った。',
    stats: [{ value: '52', unit: '年', label: '営業年数' }, { value: '6.1', unit: '万人', label: '送り出した卒業生', accent: true }] },
  { number: '0435', name: '喫茶 ロマン', industry: '喫茶', founded: 1972, died: 2015, cause: '再開発',
    epitaph: '同じ席で四十年通った客がいた。ビルは、その席ごと消えた。',
    stats: [{ value: '43', unit: '年', label: '営業年数' }, { value: '1', unit: '席', label: '常連の指定席', accent: true }] },
  { number: '0436', name: '山田屋呉服店', industry: '呉服', founded: 1923, died: 2003, cause: '生活様式の変化',
    epitaph: '嫁入りの着物を仕立てた家が、三軒先まで途切れた。',
    stats: [{ value: '80', unit: '年', label: '営業年数' }, { value: '3', unit: '代', label: '受け継いだ主', accent: true }] },
  { number: '0437', name: 'テクノソフト', nameLatin: 'TechnoSoft', industry: 'IT', founded: 1998, died: 2008, cause: '資金繰り',
    epitaph: '時代の二歩先を行った。資金は半歩しか、ついてこなかった。',
    stats: [{ value: '10', unit: '年', label: '営業年数' }, { value: '2', unit: '歩', label: '時代の先', accent: true }] }
];
