/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minha-cor-1': '#032541',
        'minha-cor-2': '#1bb8d8',
      },
    },
  },
  plugins: [],
}