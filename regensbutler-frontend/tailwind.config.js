module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "0.5rem",
        sm: "1rem",
        lg: "3rem",
        xl: "3rem",
        xxl: "3rem",
        xxxl: "2rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
