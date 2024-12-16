/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'sketch-texture': "url('/images/sketch-texture.png')",
        'button-texture': "url('/images/button-texture.png')",
      },
      colors: {
        'pokemon-red': '#FF0000',
        'pokemon-dark-red': '#CC0000',
      },
      fontFamily: {
        'pokemon': ['"Pokemon Solid"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}