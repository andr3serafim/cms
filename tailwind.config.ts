import type { Config } from "tailwindcss";

export default {
    darkMode: "class",

    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '100rem', // equivale a 1600px
                '4xl': '120rem', // equivale a 1920px
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                vermelho1: "#FE3737",
            },
        },
    },
    plugins: [],
} satisfies Config;
