import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          dark: "#0B1628",
          light: "#2A3D5F",
        },
        gold: {
          DEFAULT: "#C8A96E",
          cta: "#B8923E",
          light: "#D4C5A9",
        },
      },
      fontFamily: {
        "serif-jp": ["var(--font-serif-jp)", "serif"],
        "serif-en": ["var(--font-serif-en)", "serif"],
        "sans-jp": ["var(--font-sans-jp)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
