/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#ec4899",
          600: "#db2777",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        dark: "#4b4370",
        error: {
          400: "#ff8383",
          500: "#ef4444",
        },
        yellow: "#eab308",
        blue: "#93c5fd",
        green: {
          100: "#d1fae5",
          500: "#22c55e",
        },
      },
    },
  },
  plugins: [],
};
