// @ts-check

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      blue: {
        primary: '#053FB0',
        secondary: '#3071EF',
      },
      gray: {
        100: '#F1F3F5',
        200: '#CFD8DC',
        300: '#AFBAC5',
        400: '#90A4AE',
        500: '#546E7A',
        600: '#091D45',
      },
      green: {
        100: '#388E3C',
        200: '#146622',
        300: '#4FD055',
      },
      red: {
        100: '#C62828',
        200: '#AD0000',
      },
      white: '#ffffff',
      'ae-blue': {
        100: '#003057'
      }
    },
    extend: {
      flex: {
        '2': '2 2 0%'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      keyframes: {
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
      },
    },
  },
  // @ts-ignore
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-radix')(), require('tailwindcss-animate')],
};

module.exports = config;
