/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#cbd5e0 #f1f1f1",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            "border-radius": "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            "border-radius": "4px",
            "&:hover": {
              background: "#a0aec0",
            },
          },
        },
      });
    },
  ],
};
