/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './src/app/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      mont: ['Montserrat', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
