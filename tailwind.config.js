/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Noto: ['"Noto Sans JP"', "sans-serif"],
        hiragino: ["Hiragino Sans GB", "sans-serif"],
      },
      animation: {
        'move-effect': 'move 3s ease-in-out infinite', // Animation name
      },
      keyframes: {
        move: {
          '0%': { transform: 'translateX(-50%)' }, // Start from left
          '50%': { transform: 'translateX(0)' },    // Move to center
          '100%': { transform: 'translateX(50%)' }, // End at right
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
