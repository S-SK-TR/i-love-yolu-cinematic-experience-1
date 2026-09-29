import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        'alt-sans': ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'hsl(var(--background-base) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'hsl(var(--text-primary) / <alpha-value>)',
          muted: 'hsl(var(--text-muted) / <alpha-value>)',
        },
        'glass-overlay': 'rgba(var(--glass-overlay-rgb), var(--glass-bg-opacity))',
        'glass-border': 'rgba(var(--glass-overlay-rgb), var(--glass-border-opacity))'
      },
      gridTemplateColumns: {
        'bento': 'repeat(auto-fill, minmax(250px, 1fr))'
      },
      gridAutoRows: {
        'bento': 'minmax(200px, auto)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}

export default config
