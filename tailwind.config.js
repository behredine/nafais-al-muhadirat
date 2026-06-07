/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Cormorant Garamond'", "Georgia", "serif"],
        arabic: ["'Amiri'", "'Scheherazade New'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Cinzel'", "serif"],
      },
      colors: {
        parchment: {
          50:  "#fdf8f0",
          100: "#f7edd8",
          200: "#edd5aa",
          300: "#ddb87a",
          400: "#c99448",
          500: "#b87d2e",
          600: "#9a6422",
          700: "#7c4e1a",
          800: "#5f3c14",
          900: "#42290d",
        },
        ink: {
          50:  "#f0ebe3",
          100: "#d9cfc3",
          200: "#b8a990",
          300: "#96825e",
          400: "#7a6640",
          500: "#5e4c2c",
          600: "#4a3b22",
          700: "#362c1a",
          800: "#231d11",
          900: "#120e07",
        },
        gold: {
          300: "#f0d080",
          400: "#ddb843",
          500: "#c9961a",
          600: "#a87710",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        }
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
