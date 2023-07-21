/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#D9BCA9',
        secondary: '#C56E33',
      }
    },
  },
  plugins: [],
}

