import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chrome: { DEFAULT: "#2C2C31", raised: "#38383F", line: "#45454E", text: "#EDEDF0", dim: "#A6A6B0" },
        canvas: { DEFAULT: "#E6E6EB", dot: "#C4C4CE" },
        ink: { DEFAULT: "#16161B", mute: "#5A5A66", faint: "#8A8A96" },
        select: "#2F6BFF",
        redline: "#EC2F68",
        comp: "#8B5CF6",
        azza: { DEFAULT: "#E8743B", deep: "#B9521F", paper: "#FBEBD2" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        frame: "0 1px 2px rgba(22,22,27,0.06), 0 12px 32px -16px rgba(22,22,27,0.28)",
        float: "0 12px 40px -12px rgba(22,22,27,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
