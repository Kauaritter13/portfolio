import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#D97757",
          soft: "#E8A485",
          deep: "#C6603F",
          amber: "#E8C38A",
        },
        sky: {
          DEFAULT: "#D97757",
          deep: "#C6603F",
          soft: "#E8A485",
          ice: "#F5E6D3",
        },
        ink: {
          950: "#0D0906",
          900: "#14100D",
          800: "#1F1915",
          700: "#2A2420",
          600: "#3A332D",
        },
        cream: {
          DEFAULT: "#E1E0CC",
          soft: "#F5E6D3",
          warm: "#E8DCC5",
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
