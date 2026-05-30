/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f3efe4',
        ink: '#1a1714',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      boxShadow: {
        hard: '4px 4px 0 #1a1714',
        'hard-sm': '3px 3px 0 #1a1714',
        'hard-lg': '6px 6px 0 #1a1714',
      },
    },
  },
  plugins: [],
}
