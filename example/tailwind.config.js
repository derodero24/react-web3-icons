const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
        orbitron: ['Orbitron', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '475px',
        '3xl': '1920px',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.875rem'],
      },
      height: {
        '100svh': '100svh',
        '100lvh': '100lvh',
        '100dvh': '100dvh',
      },
      minHeight: {
        '100svh': '100svh',
        '100lvh': '100lvh',
        '100dvh': '100dvh',
      },
      maxHeight: {
        '100svh': '100svh',
        '100lvh': '100lvh',
        '100dvh': '100dvh',
      },
    },
  },
  plugins: [],
};
