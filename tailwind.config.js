/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./components/**/*.{js,ts,jsx,tsx}", // Komponenty
    "./pages/**/*.{js,ts,jsx,tsx}", // (opcjonalnie, jeśli używasz pages/)
  ],
  theme: {
    extend: {
      colors: {
        primary500: "#F29145",
        neutral900: "#FCFCFC",
        neutral600: "#E7E7E7",
        neutral500: "#B0B0B0",
      },
    },
  },
  plugins: [],
};
