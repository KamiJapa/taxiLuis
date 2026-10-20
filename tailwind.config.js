/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#08090b",
        gold: "#d4af37",
        "gold-light": "#f1cd65"
      }
    }
  },
  plugins: []
};
