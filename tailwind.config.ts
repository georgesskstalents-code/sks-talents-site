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
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"]
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
