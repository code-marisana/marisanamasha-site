/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E2746",
        mist: "#F4F7FB",
        steel: "#4A637D"
      },
      boxShadow: {
        card: "0 10px 30px -18px rgba(14, 39, 70, 0.35)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 0.45s ease-out"
      }
    }
  },
  plugins: []
};
