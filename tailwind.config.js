/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styleComponents/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeGreen: "#3d5a6c",
      },
    },
    screens: {
      '2xl': {'max': '1535px'}, // => @media (max-width: 1535px) { ... }
      'xl': {'max': '1279px'}, // => @media (max-width: 1279px) { ... }
      'lg': {'max': '1023px'}, // => @media (max-width: 1023px) { ... }
      'md': {'max': '767px'}, // => @media (max-width: 767px) { ... }
      'sm': {'max': '639px'}, // => @media (max-width: 639px) { ... }
    }
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("@tailwindcss/typography"),
    function({ addUtilities, theme }) {
      const sizes = theme("spacing"); // Use Tailwind's default spacing scale
      const boxUtilities = Object.keys(sizes).reduce((acc, key) => {
        acc[`.box-${key}`] = {
          width: sizes[key],
          height: sizes[key],
        };
        return acc;
      }, {});

      addUtilities(boxUtilities, ["responsive"]);
    },
  ],
};
// tailwind.config.js
