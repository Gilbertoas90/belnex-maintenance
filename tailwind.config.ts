import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        energy: "#66CC00",
        canvas: "#050505",
      },
      boxShadow: {
        glow: "0 0 36px rgba(102, 204, 0, 0.16)",
        button: "0 12px 30px rgba(0, 0, 0, 0.22)",
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(102, 204, 0, 0.55)" },
          "70%": { boxShadow: "0 0 0 13px rgba(102, 204, 0, 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 2.2s infinite",
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
