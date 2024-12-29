/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue3: '#0014FF',
        blue2: '#009EFF',
        blue1: '#00E7FF',
        bg: '#DCF2F1'
      }
    },
  },
  plugins: [],
}