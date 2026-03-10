/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B0B0B",   // deep black
        gold: "#C6A75E",      // premium gold
        softwhite: "#F8F8F8"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}