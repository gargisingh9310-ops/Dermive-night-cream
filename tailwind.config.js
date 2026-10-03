/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          950: '#1B261F',
          900: '#24372B',
          800: '#27352D', // Deep Olive Charcoal
          DEFAULT: '#31483A', // Deep Botanical Green
          700: '#3D5948',
          600: '#4E6E5C',
          500: '#648772',
          muted: '#69736A', // Muted text
          sage: '#879B7A', // Muted Sage
          border: '#C9D2C2', // Soft Sage Border
          light: '#E8EBDD', // Very Light Sage
          subtle: '#F0F3E9',
        },
        ivory: {
          DEFAULT: '#F7F3E8', // Warm Ivory / Cream
          light: '#FAF8F2',
          card: '#FFFFFF',
          dark: '#EDE8DC',
          border: '#DDE2D8',
        },
        champagne: {
          DEFAULT: '#C9A96A', // Soft Champagne Gold
          light: '#DFCCA1',
          shimmer: '#F3E8CE',
          dark: '#A68545',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
