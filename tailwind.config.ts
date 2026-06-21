import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // CARNIVALE brand (CANONICAL): navy / red / amber
        navy: {
          DEFAULT: "#14283C",
          50: "#eef2f7",
          800: "#1b3350",
          900: "#14283C",
          950: "#0d1a28",
        },
        carnival: {
          // CARNIVALE red
          DEFAULT: "#C0392B",
          600: "#C0392B",
          700: "#a32f23",
        },
        amber: {
          DEFAULT: "#E0A800",
          500: "#E0A800",
          600: "#c79500",
        },
        cream: "#FBF7EF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,40,60,0.06), 0 8px 24px rgba(20,40,60,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
