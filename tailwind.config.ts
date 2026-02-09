import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          800: "#3d2c1e",
          900: "#2d1f14",
          950: "#1a120b",
        },
        accent: {
          DEFAULT: "#25D366",
          hover: "#20bd5a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
