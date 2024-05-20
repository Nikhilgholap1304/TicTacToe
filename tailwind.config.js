/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': {'min':'450px','max':'639px'},
        '2xs': {'min':'320px','max':'449px'},
      },
      fontFamily: {
        Poppins: ["var(--font-poppins)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        Poetsen_One: ["Poetsen One"],
        Concert: ["Concert One"],
      },
    },
  },
  plugins: [],
}

