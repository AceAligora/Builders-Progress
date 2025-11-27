/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aces: {
          1: '#c6d0e6',
          2: '#a3b9e0',
          3: '#6a9edc',
          4: '#4c7ceb',
          5: '#2e57b8',
        },
      },
    },
  },
  plugins: [],
};