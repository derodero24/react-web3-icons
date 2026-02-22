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
      height: {
        '100svh': '100svh',
      },
      minHeight: {
        '100svh': '100svh',
      },
    },
  },
  plugins: [],
};
