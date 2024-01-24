/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      bgSecondary: "#152232",
      bgPrimary: "#0a1625",
      bgTertiary: "#0b1622",
      bgFooter: "#11161d",
      bgHover: "#abbacd",
      bgBanner: "#242538",
      actionPrimary: "#3DB5F3",
      actionSecondary: "#59BEF4",
      actionNav: "#3577ff",
      red: "#ED294A",
      textLight: "#728AA1",
      textPrimary: "#a0b1c5",
      textBright: "#edf1f5",
      textWhite: "#d9e6ff",
      textLightBlue: "#acd5f2",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        sans: [
          "Overpass",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
