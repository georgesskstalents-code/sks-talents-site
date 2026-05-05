import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#41a0a4",
          stone: "#5F5E5A",
          sand: "#f8f8f8",
          ink: "#1e2a2a",
          mint: "#dff3f1"
        }
      },
      fontFamily: {
        // Resolved from next/font CSS variables (set in app/layout.tsx).
        // Fallbacks kept for the brief flash before the web font is ready.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      // Type scale — modular, mobile-first. Each token: [size, lineHeight, letterSpacing?]
      // Mobile values; use sm: prefix for desktop overrides documented in Copilot/Typo-System.md.
      fontSize: {
        // Display (hero-grade serif italic-friendly)
        "display-xl": ["40px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-l": ["32px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        // Headings
        "h1": ["28px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h2": ["22px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "h3": ["18px", { lineHeight: "1.25" }],
        // Body
        "body-l": ["16px", { lineHeight: "1.7" }],
        "body": ["15px", { lineHeight: "1.7" }],
        // Meta
        "caption": ["13px", { lineHeight: "1.5" }],
        "eyebrow": ["11px", { lineHeight: "1", letterSpacing: "0.18em" }]
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.25",
        normal: "1.5",
        relaxed: "1.7",
        loose: "1.85"
      },
      letterSpacing: {
        tight: "-0.02em",
        snug: "-0.01em",
        normal: "0",
        wide: "0.18em",
        eyebrow: "0.22em"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(25, 72, 74, 0.12)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(65,160,164,0.2), transparent 30%), radial-gradient(circle at 80% 0%, rgba(95,94,90,0.12), transparent 25%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(223,243,241,0.8))"
      }
    }
  },
  plugins: []
};

export default config;
