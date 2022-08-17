/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,ts}"
  ],
  theme: {
    extend: {},
    colors: {
      'pastel-grey': "#91949b",
      'pastel-blue': "#89aed8",
    }
  },
  plugins: [],
}
