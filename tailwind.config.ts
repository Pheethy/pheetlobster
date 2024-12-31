import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "#121212",
        purple_dark_mode: "#BB86FC",
        blue_dark_mode: "#3700B3",
        green_dark_mode: "#03DAC6",
      },
      fontFamily: {
        playfair: ["Playfair Display"],
        fJalla: ["Fjalla One"],
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(100px, 1fr))",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
