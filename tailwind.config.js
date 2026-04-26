/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          700: '#0e7490',
          900: '#164e63'
        },
        sand: {
          50: '#fffbeb',
          100: '#fef3c7',
          300: '#fcd34d'
        },
        sunset: {
          400: '#fb923c',
          500: '#f97316'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
};
