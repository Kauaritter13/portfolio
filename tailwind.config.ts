import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#FF6A2B",
          soft: "#FFB27A",
          deep: "#EA580C",
          amber: "#FBBF24",
        },
        sky: {
          DEFAULT: "#3B82F6",
          deep: "#1E40AF",
          soft: "#60A5FA",
          ice: "#BFDBFE",
        },
        ink: {
          950: "#050A18",
          900: "#0A1628",
          800: "#0F1E3A",
          700: "#1A2E52",
          600: "#253E6E",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Instrument Serif"', "serif"],
      },
      animation: {
        "pulse-slow": "pulseSlow 3.2s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "breathe": "breathe 10s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
