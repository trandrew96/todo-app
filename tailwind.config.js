/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlue: "hsl(234, 39%, 85%)",
        DarkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
