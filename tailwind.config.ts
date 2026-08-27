import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f2',
          100: '#ffe8e2',
          200: '#ffd4c8',
          300: '#ffb3a1',
          400: '#ff8466',
          500: '#ff5733',
          600: '#f03a13',
          700: '#ca2b08',
          800: '#a6250b',
          900: '#87230f',
        },
        sun: {
          light: '#fef08a',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
          glow: '#fbbf24',
        },
        mint: {
          light: '#a7f3d0',
          DEFAULT: '#10b981',
          dark: '#047857',
        },
        sky: {
          light: '#bae6fd',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        },
        lilac: {
          light: '#e9d5ff',
          DEFAULT: '#a855f7',
          dark: '#7e22ce',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'craft': '0 8px 0 rgba(0,0,0,0.08), 0 16px 24px -6px rgba(0,0,0,0.06)',
        'craft-hover': '0 12px 0 rgba(0,0,0,0.1), 0 24px 32px -8px rgba(0,0,0,0.1)',
        'craft-sm': '0 4px 0 rgba(0,0,0,0.06), 0 8px 16px -4px rgba(0,0,0,0.04)',
        'craft-dark': '0 8px 0 rgba(0,0,0,0.4), 0 16px 24px -6px rgba(0,0,0,0.3)',
        'glow-brand': '0 0 24px rgba(255, 87, 51, 0.35)',
        'glow-sun': '0 0 24px rgba(245, 158, 11, 0.35)',
        'glow-mint': '0 0 24px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
