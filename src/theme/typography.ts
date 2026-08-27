import { TextStyle } from 'react-native';
import { color } from './tokens';

// Inter throughout, never above weight 500 — hierarchy is size and space.
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
} as const;

type Role = TextStyle & { fontFamily: string };

export const type: Record<
  | 'heroHeadline'
  | 'screenTitle'
  | 'bigFigure'
  | 'sectionFigure'
  | 'rowFigure'
  | 'body'
  | 'rowLabel'
  | 'secondary'
  | 'note'
  | 'kicker'
  | 'accentKicker'
  | 'timestamp',
  Role
> = {
  heroHeadline: { fontFamily: fontFamily.regular, fontSize: 33, lineHeight: 36, color: color.text },
  screenTitle: { fontFamily: fontFamily.medium, fontSize: 20, lineHeight: 25, color: color.text },
  bigFigure: { fontFamily: fontFamily.medium, fontSize: 37, lineHeight: 42, color: color.text },
  sectionFigure: { fontFamily: fontFamily.medium, fontSize: 30, lineHeight: 35, color: color.text },
  rowFigure: { fontFamily: fontFamily.medium, fontSize: 18, lineHeight: 22, color: color.text },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 23, color: color.textMuted },
  rowLabel: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 18, color: color.text },
  secondary: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 19, color: color.textDim },
  note: { fontFamily: fontFamily.regular, fontSize: 11.5, lineHeight: 18, color: color.textFaint },
  kicker: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    letterSpacing: 0.88,
    color: color.textFaint,
    textTransform: 'uppercase',
  },
  accentKicker: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    letterSpacing: 1.1,
    color: color.accent,
    textTransform: 'uppercase',
  },
  timestamp: { fontFamily: fontFamily.regular, fontSize: 11, color: color.textGhost },
};

/** All monetary figures and dates use tabular numerals with tight tracking. */
export const tabularNumerals: TextStyle = {
  fontVariant: ['tabular-nums'],
  letterSpacing: -0.2,
};
