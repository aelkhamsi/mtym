/** @type {import('tailwindcss').Config} */
const uiConfig = require('ui/tailwind.config');

module.exports = {
  presets: [uiConfig],
  content: [
    "./src/core/**/*.{js,jsx,ts,tsx}",
    "../ui/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

