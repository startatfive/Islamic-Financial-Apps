// Nocturne design system — dark ground, single blurple accent, compact spacing, 8px radii.
// Values sourced from design-tokens.md; do not sample the HTML prototype for pixel values.

export const color = {
  bg: '#161826',
  surface: '#232532',
  surfaceHover: '#2a2d3c',
  border: '#3f424d',
  text: '#e9e9ed',
  textMuted: '#b2b6ca',
  textDim: '#9397ab',
  textFaint: '#75798c',
  textGhost: '#595d6c',
  accent: '#9184d9',
  accentLight: '#b5abfc',
  accentPale: '#d2cefd',
  rose: '#c78ba4',
  rosePale: '#f0d8e2',
  roseBody: '#e2c2ce',
  // Fixed extras used by component recipes in design-tokens.md
  chipActiveText: '#e7e5fe',
  iconTileText: '#cfd3e5',
} as const;

/** Compliance dot / ruling colors — never red. */
export const complianceColor = {
  halal: color.accent,
  syubhat: '#75798c',
  bad: color.rose,
} as const;

export function tint(base: 'accent' | 'rose', alpha = 0.11): string {
  const hex = base === 'accent' ? color.accent : color.rose;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 22,
  xxxl: 28,
} as const;

export const radius = {
  card: 8,
  row: 8,
  key: 9,
  iconTile: 11,
  chip: 999,
  avatar: 999,
} as const;

export const iconStroke = 1.7;
export const iconSize = 21;

export const hairlineMargin = 20;
