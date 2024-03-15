/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "test": {
          "500" : "#282A37",
          "600" : "#101117",
        }
      }
    },
  },
  plugins: [],
}

