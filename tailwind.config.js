module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-orange": "#FF5A34",
        splash_button: "#BEBEBE",
        beige: "#EEE3D0",
        brown: "#5E464A",
        teal: "#95CFBD",
        "theme-pink": "#F093BD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
