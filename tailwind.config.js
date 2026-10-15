/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // ---- Brand core (DESIGN.md exact values) ----
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
        // ---- Outline ----
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
        // ---- Semantic accents (de-saturated) ----
        calmGreen: '#3e8068',
        warmAmber: '#c58a35',
        mutedCoral: '#c65d5d',
      },
      fontFamily: {
        sans: ['Inter_400Regular', 'System'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
