import type { Config } from 'tailwindcss'

/*
 * ✏️ EDIT HERE: Tailwind theme (colors, fonts, animations)
 * Colors here are the design-token defaults. The LIVE runtime theme
 * (crimson / matrix / cyan) is driven by CSS variables set in
 * src/data/theme.ts — change palettes there for the theme switcher.
 */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ✏️ EDIT HERE: base surface colors (hex strings)
        ink: {
          900: '#0a0a0c', // near-black background
          800: '#101014',
          700: '#16161c',
          600: '#1e1e26',
        },
        // These map to CSS variables so the theme switcher can recolor live.
        brand: 'rgb(var(--c-brand) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'brand-2': 'rgb(var(--c-brand-2) / <alpha-value>)',
        muted: '#8b8b96',
      },
      fontFamily: {
        // ✏️ EDIT HERE: font stacks (first value should match index.html <link>)
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'glitch-shift': {
          '0%,100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'count-blip': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'loading-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'glitch-shift': 'glitch-shift 300ms steps(2) infinite',
        scanline: 'scanline 6s linear infinite',
        'loading-bar': 'loading-bar 1.2s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config
