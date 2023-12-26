/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#f3e7db",
          200: "#d8d1cb40",
          300: "#d8d1cb93",
          500: "#00000040",
          600: "#00000060"
        },
        orange: {
          200: "#f3c164",
        }
      },
      borderRadius: {
        "5xl": "3rem",
      }
    },
  },
  plugins: [],
}

