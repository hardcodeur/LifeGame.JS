/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts}",
    "./node_modules/flowbite/**/*{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "gray-anthracite" : "#2F2F2F",
        "green-neon" : "#39FF14",
        "gray-black" : "#4A4A4A",
        "gray-white" : "#C6CCD4"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

