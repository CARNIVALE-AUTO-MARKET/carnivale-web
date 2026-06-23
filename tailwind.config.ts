import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // CARNIVALE Design System v1 — fairground roles
        navy: {
          DEFAULT: "#14283C",
          50: "#eef2f7",
          800: "#1b3350",
          900: "#14283C",
          950: "#0d1a28",
        },
        carnival: {
          // Carnival Red
          DEFAULT: "#C0392B",
          600: "#C0392B",
          700: "#a32f23",
        },
        marquee: {
          // Marquee Gold — primary CTA, string lights, Featured tags, savings
          DEFAULT: "#E0A800",
          500: "#E0A800",
          600: "#c79500",
        },
        // Back-compat alias: existing `amber-*` classes map to Marquee Gold.
        amber: {
          DEFAULT: "#E0A800",
          500: "#E0A800",
          600: "#c79500",
        },
        bulb: "#F4C75A", // Bulb Gold — glowing bulbs, hover glints
        cream: "#FBF6EC", // Canvas Cream — warm paper/tent background, cards
        pine: {
          DEFAULT: "#1E7B45", // trust / verified / "you save"
          600: "#1E7B45",
          700: "#176237",
        },
        mint: "#E3F1E8", // "you save" / verified pill backgrounds
        slate: {
          DEFAULT: "#AEBCCC", // body text on navy
          300: "#AEBCCC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        marquee: ["var(--font-marquee)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,40,60,0.06), 0 8px 24px rgba(20,40,60,0.08)",
        lift: "0 10px 30px rgba(20,40,60,0.18)",
        bulb: "0 0 10px rgba(244,199,90,0.85), 0 0 22px rgba(224,168,0,0.55)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.72", filter: "brightness(0.82)" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.5s ease-in-out infinite",
        "marquee-scroll": "marquee-scroll 22s linear infinite",
        shine: "shine-sweep 0.9s ease",
      },
    },
  },
  plugins: [],
};

export default config;
