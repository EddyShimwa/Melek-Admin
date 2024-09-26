/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
      },
      colors: {
        ["app-green"]: "#05732F",
        ["title-dark-green"]: "#063211",
      },
    },
  },
  plugins: [],
};
