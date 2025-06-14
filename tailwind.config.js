/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f11',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#7c3aed',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#06b6d4',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1f1f23',
          foreground: '#a1a1aa',
        },
        border: '#27272a',
        input: '#27272a',
        ring: '#7c3aed',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 8vw, 6rem)',
      },
      backgroundImage: {
        'sound-bar': `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.03) 2px,
          rgba(255, 255, 255, 0.03) 4px
        )`,
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)',
      },
      animation: {
        'typing': 'typing 3s steps(40, end)',
        'bounce-soft': 'bounce 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}