/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0D1117",
          card: "#161B22",
          border: "#21262D",
        },
        amber: {
          DEFAULT: "#F59E0B",
          soft: "rgba(245, 158, 11, 0.12)",
          glow: "rgba(245, 158, 11, 0.35)",
        },
        ink_text: {
          primary: "#F0F6FC",
          muted: "#8B949E",
          faint: "#484F58",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        "fluid-h1": [
          "clamp(2.75rem, 2.1rem + 2.6vw, 4.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        "fluid-h2": [
          "clamp(1.75rem, 1.55rem + 0.9vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #161B22 1px, transparent 1px), linear-gradient(to bottom, #161B22 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        "amber-glow": "0 0 0 1px rgba(245,158,11,0.4), 0 0 24px rgba(245,158,11,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        blink: "blink 1.1s steps(2, start) infinite",
        "scroll-line": "scrollLine 1.8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        scrollLine: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "30%": { opacity: 1 },
          "70%": { opacity: 1 },
          "100%": { transform: "translateY(300%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
