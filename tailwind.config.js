/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#0a0a0a',
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
          400: '#4a4a4a',
        },
        neon: {
          50: '#00ff41',  // Яркий неоновый зелёный
          100: '#00cc33', // Средний неоновый зелёный
          200: '#009926', // Тёмный неоновый зелёный
          300: '#39ff14', // Яркий лайм
          400: '#00ff88', // Неоновый мятный
        },
        forest: {
          50: '#0d2818',
          100: '#1a4d2e',
          200: '#2d5a3d',
        },
      },
      fontFamily: {
        horror: ['var(--font-horror)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}


