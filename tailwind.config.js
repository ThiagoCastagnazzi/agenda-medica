/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        blue: {
          light: "#1570EF",
          dark: "#1849A9",
        },
        gray: {
          light: "#C0C0C0",
          dark: "#4F4F4F",
        },
        label: {
          DEFAULT: "#344054",
        },
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        blue: {
          light: "#EFF8FE",
          dark: "#1849A9",
        },
      }),
      gridTemplateColumns: {
        pacientes_list: "2fr 1fr 1fr 1fr",
        7: "1fr 3fr 2fr 1fr",
        comp_img: "repeat(auto-fill, minmax(500px, 1fr));",
        atestado: "1fr 1fr 3fr",
        exame: "1fr 1fr 1fr 2fr",
        refracao: "1fr 1fr 1fr 1fr 1fr 1fr",
      },
      screens: {
        "2xl": "1920px",
      },
    },
  },
  plugins: [],
};
