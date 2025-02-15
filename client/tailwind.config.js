/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {      
      clipPath: {
        'bookmarker': 'polygon(0 0%, 100% 0%, 100% 100%, 50% 80%, 0 100%)',
      },
    },
    fontFamily: {
      'zonaPro': ['ZonaPro', 'sans-serif'],
    },
  },
  plugins: [],
};