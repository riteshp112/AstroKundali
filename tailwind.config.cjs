/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2B3A67',
        secondary: '#FFB946',
        'accent-teal': '#48D1CC',
        'accent-maroon': '#800000',
        background: '#FFF9F0',
        text: '#333333',
        'text-light': '#666666',
        border: '#E5E5E5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
