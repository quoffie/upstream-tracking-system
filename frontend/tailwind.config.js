/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: 'rgb(184, 134, 11)',
          600: 'rgb(153, 101, 21)',
          700: 'rgb(139, 69, 19)',
        },
        blue: {
          600: 'rgb(0, 71, 171)',
          700: 'rgb(0, 56, 147)',
          800: 'rgb(0, 42, 123)',
          900: 'rgb(0, 28, 99)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};