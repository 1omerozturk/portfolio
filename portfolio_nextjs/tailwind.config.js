/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        line: "var(--color-border)",
        brand: "var(--color-primary)",
        accent: "var(--color-accent)",
      },
    },
  },
  safelist: [
    "border-blue-500",
    "border-fuchsia-500",
    "border-red-500",
    "border-lime-500",
    "border-orange-500",
    "border-purple-500",
    "border-teal-500",
    "border-indigo-500", // Default renk
  ],

  plugins: [],
};
