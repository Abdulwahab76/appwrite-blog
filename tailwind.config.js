/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'text-purple' : '#6941C6',
        'text-blue':'#3538CD',
        'text-pink': '#C11574',
        'text-green':'#027A48'


      }
    },
  },
  plugins: [],
}

