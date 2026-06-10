/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F0EEF5",
        cream: "#F8F7FC",
        ink: "#0A0A0A",
        graphite: "#3D3A4A",
        cobalt: "#8A2BE2",
        electric: "#2E008B",
        amber: "#FF00FF",
        cyan: "#00FFFF",
        mist: "#E4E0EE",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, #2e008b, #8a2be2, #ff00ff, #00ffff)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
      animation: {
        "marquee-sm": "marquee 22s linear infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-lg": "marquee 42s linear infinite",
        floaty: "floaty 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
