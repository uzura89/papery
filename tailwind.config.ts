import { link } from "fs";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      // sans: ["Inter", "sans-serif"],
      serif: ["Lora", "serif"],
    },
    extend: {
      colors: {
        fore: "rgb(var(--fore-rgb))",
        foreSecondary: "rgb(var(--fore-secondary-rgb))",
        foreEntry: "rgb(var(--fore-entry-rgb))",
        foreLight: "rgb(var(--fore-light-rgb))",
        foreLighter: "rgb(var(--fore-lighter-rgb))",
        foreDanger: "rgb(var(--fore-danger-rgb))",
        forePositive: "rgb(var(--fore-positive-rgb))",
        backDanger: "rgb(var(--back-danger-rgb))",
        foreGray: "rgb(var(--fore-gray-rgb))",
        foreGrayLight: "rgb(var(--fore-gray-light-rgb))",
        link: "rgb(var(--link-rgb))",
        textHoverBg: "rgb(var(--text-hover-bg-rgb))",
        back: "rgb(var(--back-rgb))",
        backDim: "rgb(var(--back-dim-rgb))",
        backDark: "rgb(var(--back-dark-rgb))",
        backLight: "rgb(var(--back-light-rgb))",
        backLightest: "rgb(var(--back-lightest-rgb))",
        backActive: "rgb(var(--back-active-rgb))",
        border: "rgb(var(--border-rgb))",
        borderLight: "rgb(var(--border-light-rgb))",
        borderGray: "rgb(var(--border-gray-rgb))",
        card: "rgb(var(--card-rgb))",
        fillPositive: "rgb(var(--fill-positive-rgb))",
        fillLightGray: "rgb(var(--fill-light-gray-rgb))",
        fillPrimaryLight: "rgb(var(--fill-primary-light-rgb))",
        shadowColor: "rgb(var(--shadow-color-rgb))",
        buttonBgDefault: "rgb(var(--button-bg-default-rgb))",
        buttonBgPrimary: "rgb(var(--button-bg-primary-rgb))",
        brandlogo: "rgb(var(--brandlogo-rgb))",
      },
      boxShadow: {
        bottom: "0px 0px 10px",
      },
    },
  },
  plugins: [],
};

/* ".inherited-styles-for-exported-element" is a generated class for the inherited styles of the exported element, feel free to rename it. */
