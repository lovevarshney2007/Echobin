import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#005b34",
          container: "#137547",
          fixed: "#9cf6bc",
          "fixed-dim": "#80d9a1",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#9ef8be",
          fixed: "#002110",
          "fixed-variant": "#00522f",
        },
        secondary: {
          DEFAULT: "#5a5f67",
          container: "#dee2ec",
          fixed: "#dee2ec",
          "fixed-dim": "#c2c7d0",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#60656d",
          fixed: "#171c23",
          "fixed-variant": "#42474f",
        },
        tertiary: {
          DEFAULT: "#793f00",
          container: "#9c5300",
          fixed: "#ffdcc3",
          "fixed-dim": "#ffb77d",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#ffdfc8",
          fixed: "#2f1500",
          "fixed-variant": "#6e3900",
        },
        amber: {
          accent: "#d97706",
        },
        surface: {
          DEFAULT: "#f9f9f7",
          dim: "#dadad8",
          bright: "#f9f9f7",
          variant: "#e2e3e1",
          tint: "#006d40",
          "container-lowest": "#ffffff",
          "container-low": "#f4f4f2",
          container: "#eeeeec",
          "container-high": "#e8e8e6",
          "container-highest": "#e2e3e1",
        },
        "on-surface": {
          DEFAULT: "#1a1c1b",
          variant: "#3f4941",
        },
        outline: {
          DEFAULT: "#6f7a70",
          variant: "#bec9bf",
        },
        "inverse-surface": "#2f3130",
        "inverse-on-surface": "#f1f1ef",
        "inverse-primary": "#80d9a1",
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
        background: "#f9f9f7",
        "on-background": "#1a1c1b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
