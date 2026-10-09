import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#0F1631",
        panel: "#172046",
        raised: "#1F2A5A",
        line: "#2C3A78",
        ink: "#EEF0FF",
        dim: "#A9B1DB",
        cursor: { DEFAULT: "#FFC93C", ink: "#1C1400" },
        go: "#5EE6B0",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        media: "14px",
        control: "10px",
      },
      boxShadow: {
        lift: "0 18px 40px -18px rgba(3, 6, 24, 0.85)",
        cursor: "0 0 0 2px #FFC93C, 0 12px 30px -12px rgba(255, 201, 60, 0.45)",
      },
      keyframes: {
        drift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        drift: "drift 60s linear infinite",
        "drift-slow": "drift 85s linear infinite",
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
