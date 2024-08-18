import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      lg: '1280px',
      md: "375pxpx",
      sm: "0px",
    },
    colors: {
      "txt-color": "#000000",
      "background-primary": "#FFFFFF",
      "background-secondary": "#F3F3F3",
      "strokes-primary": "#D4D4D4",
      "strokes-secondary": "#E6E6E6",
      gray: "#838383",
      error: "#F00000",
      accent: "#FEFF80",
    },
    fontWeight: {
      normal: "400",
      bold: "500",
    },
    fontSize: {
      normal: "16px",
      big: "30px",
    },
    lineHeight: {
      normal: "25.6px",
      big: "42px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
