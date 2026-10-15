/**
 * AyuOS design tokens — exact values from
 * stitch_ayuos_health_operating_system_design/ayuos/DESIGN.md
 *
 * Warm Editorial Minimalism with Tonal Layering.
 * 80–85% neutral foundation, 10–15% deep restorative oceanic tones,
 * restrained micro-dosed semantic accents.
 */

export const colors = {
  // ---- Brand core ----
  primary: '#004345',
  onPrimary: '#ffffff',
  primaryContainer: '#0f5c5e',
  onPrimaryContainer: '#90d2d4',
  inversePrimary: '#90d2d4',

  secondary: '#226584',
  onSecondary: '#ffffff',
  secondaryContainer: '#9dd9fd',
  onSecondaryContainer: '#1b607f',

  tertiary: '#2e3f3c',
  onTertiary: '#ffffff',
  tertiaryContainer: '#455653',
  onTertiaryContainer: '#b8cac7',

  // ---- Surfaces ----
  surface: '#f7faf9',
  surfaceDim: '#d7dbda',
  surfaceBright: '#f7faf9',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f1f4f3',
  surfaceContainer: '#ebeeed',
  surfaceContainerHigh: '#e6e9e8',
  surfaceContainerHighest: '#e0e3e2',
  onSurface: '#181c1c',
  onSurfaceVariant: '#3f4949',
  surfaceVariant: '#e0e3e2',
  surfaceTint: '#21686a',
  inverseSurface: '#2d3131',
  inverseOnSurface: '#eef1f0',

  // ---- Outline / borders ----
  outline: '#6f7979',
  outlineVariant: '#bfc8c8',

  // ---- Error ----
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // ---- Fixed accent scales ----
  primaryFixed: '#aceef0',
  primaryFixedDim: '#90d2d4',
  onPrimaryFixed: '#002021',
  onPrimaryFixedVariant: '#004f51',

  secondaryFixed: '#c4e7ff',
  secondaryFixedDim: '#92cef2',
  onSecondaryFixed: '#001e2c',
  onSecondaryFixedVariant: '#004c69',

  tertiaryFixed: '#d4e6e3',
  tertiaryFixedDim: '#b8cac7',
  onTertiaryFixed: '#0e1e1c',
  onTertiaryFixedVariant: '#394a47',

  // ---- Background ----
  background: '#f7faf9',
  onBackground: '#181c1c',

  // ---- Semantic accents (deliberately de-saturated) ----
  calmGreen: '#3e8068', // stability / verification
  warmAmber: '#c58a35', // pending reviews / financial dues
  mutedCoral: '#c65d5d', // critical / emergency / urgent
} as const;

export type ColorToken = keyof typeof colors;

/** Typography scale — Inter everywhere, JetBrains Mono for clinical data. */
export const typography = {
  fontFamily: {
    sans: 'Inter',
    mono: 'JetBrains Mono',
  },
  displayLg: { fontSize: 48, lineHeight: 56, fontWeight: '600' as const },
  headlineLg: { fontSize: 32, lineHeight: 40, fontWeight: '600' as const },
  headlineMd: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
  headlineSm: { fontSize: 20, lineHeight: 28, fontWeight: '500' as const },
  bodyLg: { fontSize: 18, lineHeight: 28, fontWeight: '400' as const },
  bodyMd: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodySm: { fontSize: 14, lineHeight: 22, fontWeight: '400' as const },
  labelMd: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
  monoData: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const },
} as const;

export const rounded = {
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const spacing = {
  gutter: 24,
  gutterSm: 16,
  margin: 40,
  marginSm: 20,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
} as const;

export const theme = { colors, typography, rounded, spacing } as const;

export default theme;
