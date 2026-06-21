import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared speaker colors so transcript + scoreboard always agree.
        speakerA: { DEFAULT: "#3b82f6", soft: "#1e3a5f" }, // blue
        speakerB: { DEFAULT: "#f97316", soft: "#5c2e0e" }, // orange
      },
    },
  },
  plugins: [],
};

export default config;
