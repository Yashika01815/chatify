/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // Extra small screen breakpoint
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
    // Don't use prefix for daisyUI classes
    prefix: "",
    // Add daisyUI component classes to utilities
    utils: true,
    // Add CSS variables for all themes
    darkTheme: "dark",
    base: true,
    styled: true,
    logs: true,
  },
  // Set important to true to override any other styles
  important: true,
};