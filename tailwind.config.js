/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      bgSecondary: "#152232",
      bgPrimary: "#0a1625",
      bgTertiary: "#0b1622",
      bgFooter: "#11161d",
      bgForeground: "#151f2e",
      bgHover: "#abbacd",
      bgHoverLight: "#7c899a",
      bgBanner: "#242538",
      actionPrimary: "#3DB5F3",
      actionSecondary: "#59BEF4",
      actionNav: "#3577ff",
      red: "#ED294A",
      favRed: "#ec294b",
      favPink: "#ffaebc",
      textLight: "#728AA1",
      textPrimary: "#a0b1c5",
      textBright: "#edf1f5",
      textWhite: "#d9e6ff",
      textLightBlue: "#acd5f2",
      shadow: "#313644",
      backdrop: "#12161c",
      // anilist's colors
      background: {
        100: "rgb(237, 241, 245)",
        200: "rgb(250, 250, 250)",
        300: "rgb(245, 246, 246)",
        400: "rgb(234, 236, 237)",
        500: "rgb(246, 248, 251)",
        600: "rgb(241, 243, 247)",
        700: "rgb(31, 35, 45)",
        800: "rgb(49, 54, 68)",
        900: "rgb(6, 13, 34)",
        1000: "rgb(103, 132, 187)",
        1100: "rgb(237, 241, 245)",
        1200: "rgb(11, 22, 34)",
      },
      foreground: "rgb(250, 250, 250)",
      foregroundGrey: "rgb(245, 246, 246)",
      foregroundGreyDark: "rgb(234, 236, 237)",
      foregroundBlue: "rgb(246, 248, 251)",
      foregroundBlueDark: "rgb(241, 243, 247)",
      backgroundBlueDark: "rgb(31, 35, 45)",
      overlay: "rgb(31, 38, 49)",
      shadow: "rgb(49, 54, 68)",
      shadowDark: "rgb(6, 13, 34)",
      shadowBlue: "rgb(103, 132, 187)",
      text: "rgb(92, 114, 138)",
      textLight: "rgb(122, 133, 143)",
      textLighter: "rgb(146, 153, 161)",
      textBright: "rgb(237, 241, 245)",
      blue: "rgb(61, 180, 242)",
      blueDim: "rgb(141, 178, 219)",
      white: "rgb(255, 255, 255)",
      black: "rgb(0, 0, 0)",
      red: "rgb(232, 93, 117)",
      peach: "rgb(250, 122, 122)",
      orange: "rgb(247, 154, 99)",
      yellow: "rgb(247, 191, 99)",
      green: "rgb(123, 213, 85)",
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
      minWidth: {
        "fit-content": "fit-content",
      },
    },
  },
  plugins: [],
};
