import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turquoise: "#008a99",
          teal: "#00666a",
          orange: "#f26f21",
          cream: "#f7f3ec"
        }
      }
    }
  },
  plugins: []
};

export default config;
