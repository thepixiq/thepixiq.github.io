/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(4rem, 12vw, 10rem)",
          { lineHeight: "0.9", letterSpacing: "-0.03em" },
        ],
        editorial: [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em" },
        ],
      },
      colors: {
        auburn: {
          deep: "#8b2500",
          glow: "#c0392b",
          light: "#d4553a",
        },
      },
      animation: {
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        grain: "grain 0.5s steps(1) infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        glitch: "glitch 0.3s ease-in-out",
      },
      keyframes: {
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};
