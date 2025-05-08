/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                // For the HTML file
    "./src/**/*.{js,jsx,ts,tsx}",  // For all React/JS/TS files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), 
  ],
}
