/* eslint-disable import/no-anonymous-default-export */
import {
  footerColor,
  primaryColor,
  productPageLightPrimaryColor,
} from "./utils/SeasonChanger";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: primaryColor(),
        footer: footerColor(),
        productPageLightPrimaryColor: productPageLightPrimaryColor(),
      },
      animation: {
        rotate: "rotate 0.3s ease-in-out",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
