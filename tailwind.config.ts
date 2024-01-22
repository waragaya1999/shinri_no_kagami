import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "slide-bottom":
                    "slide-bottom 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
                "slide-top":
                    "slide-top 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
            },
            keyframes: {
                "slide-bottom": {
                    "0%": {
                        transform: "translateY(0)",
                    },
                    to: {
                        transform: "translateY(80px)",
                    },
                },
                "slide-top": {
                    "0%": {
                        transform: "translateY(80px)",
                    },
                    to: {
                        transform: "translateY(0)",
                    },
                },
            },
        },
    },
    plugins: [],
}
export default config
