/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,ts}"
  ],
  theme: {
    extend: {},
    colors: {
      'black': "#000000",
      'pastel-grey': "#91949b",
      'pastel-dark-grey': "#7f808b",
      'pastel-blue': "#89aed8",
      'pastel-green': "#88d7b6",
      'pastel-red': "#f283a4",
      'pastel-yellow': "#f7ecde",
    }
  },
  plugins: [],
}
