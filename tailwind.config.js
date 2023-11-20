/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        scBlue: '#1F6FEB',
        scGreen: '#7ED321',
        scRed: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
