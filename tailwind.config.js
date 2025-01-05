/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Noto: ['"Noto Sans JP"', "sans-serif"],
        hiragino: ["Hiragino Sans GB", "sans-serif"],
      },
      animation: {
        "move-effect": "move 3s ease-in-out infinite",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-50%)" }, 
          "50%": { transform: "translateX(0)" }, 
          "100%": { transform: "translateX(50%)" }, 
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
