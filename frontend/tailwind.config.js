/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chestnut: {
          50: "#fcf4f4",
          100: "#f9ebea",
          200: "#f4d8d7",
          300: "#eab9b7",
          400: "#dd908f",
          500: "#cd6668",
          600: "#b7474e",
          700: "#993740",
          800: "#813039",
          900: "#6f2c36",
          950: "#3d141a",
        },
      },
    },
  },
  plugins: [],
};
