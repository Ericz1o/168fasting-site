// Design tokens — Wabi-sabi · cream / clay / pine
const TOKENS = {
  // Surfaces — 宣纸乳白
  paper:      '#F5EFE3',  // main bg (宣纸)
  paperDeep:  '#EDE4D1',  // slightly deeper paper
  paperLight: '#FAF5EA',
  ink:        '#2A2620',  // 墨色主文字
  inkSoft:    '#6B6258',  // 次文字
  inkFaint:   '#A89F8F',  // 三级文字
  line:       '#D8CDB5',  // 淡棕细线
  lineFaint:  '#E8DFC9',

  // Accent — 松绿 / 苔绿
  green:      '#556B44',  // 松针深绿
  greenDeep:  '#3E4F32',
  greenSoft:  '#879B6E',  // 苔藓
  greenMist:  '#C8D2B8',  // 远山

  // Warm earth
  clay:       '#B08868',  // 淡棕 (陶土)
  claySoft:   '#D4B89A',
  rust:       '#8B5A3C',

  // Functional
  shadow:     'rgba(60, 50, 35, 0.08)',
  shadowDeep: 'rgba(60, 50, 35, 0.14)',
};

// Fonts — book-quality serif pairing
const FONTS = {
  serif: '"Cormorant Garamond", "EB Garamond", "Hoefler Text", Georgia, serif',
  sans:  '"Inter", -apple-system, system-ui, sans-serif',
  mono:  '"SF Mono", "Courier Prime", "Courier New", monospace',
};

window.TOKENS = TOKENS;
window.FONTS = FONTS;
