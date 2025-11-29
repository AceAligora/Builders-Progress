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
        feugold: {
          1: '#fef9e7',  // Very light cream (backgrounds)
          2: '#fdf0c4',  // Light gold (light accents)
          3: '#f9d56e',  // Medium gold (borders, highlights)
          4: '#F2A900',  // Primary FEU Gold
          5: '#c98a00',  // Dark gold (hover states)
          6: '#8b5e00',  // Very dark gold (text on light)
        },
      },
    },
  },
  plugins: [],
};