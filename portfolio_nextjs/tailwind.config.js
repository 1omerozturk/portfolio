/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'border-blue-500',
    'border-fuchsia-500',
    'border-red-500',
    'border-lime-500',
    'border-orange-500',
    'border-purple-500',
    'border-teal-500',
    'border-indigo-500', // Default renk
  ],

  plugins: [],
}
