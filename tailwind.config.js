/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          hov: "var(--color-text-hover)",
          alert: "var(--color-text-alert)",
          lite: "var(--color-text-lite)",

        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover':'var(--color-button-accent-hover)', 
        },
      },
      gradientColorStops:{
        skin:{
          hue: "var(--color-fill)",
        }
      }
    },
  },
  plugins: [],
};
