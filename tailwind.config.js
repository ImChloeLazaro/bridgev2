// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "360px",
        "3xl": "1600px",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },

  variants: {
    lineClamp: ["responsive", "hover"],
    height: ["responsive"],
  },

  plugins: [
    nextui({
      themes: {
        aretex: {
          extend: "light",
          colors: {
            background: "#D9D9D9",
            foreground: "#393939",
            white: {
              default: "#F9F9F9",
              hover: "#888888",
            },
            black: {
              default: "#393939",
              hover: "#6D6D6D",
              darker: "#202020",
            },
            grey: {
              default: "#EFEFEF",
              hover: "#D0D0D0",
            },
            darkgrey: {
              default: "#7d7d85",
              hover: "#55555A",
            },
            lightgrey: {
              default: "#A1A1AA",
              hover: "#E1E2E4",
            },
            orange: {
              default: "#EF8B16",
              hover: "#BA5914",
            },
            blue: {
              default: "#32449C",
              hover: "#547FDD",
            },
            green: {
              default: "#01C875",
              hover: "#0A7147",
            },
            red: {
              default: "#E2445B",
              hover: "#AF2140",
            },
            yellow: {
              default: "#FFCF4C",
              hover: "#FFE388",
            },
          },
          boxShadow: {
            base: "0px 2px 12px 0px rgba(0, 0, 0, 0.12)",
          },
        },
        // light: {
        //   colors: {
        //     foreground: "#0c0c0d",
        //     background: "#f8f6f1",
        //     primary: {
        //       DEFAULT: "#98aee6",
        //       foreground: "#F8F6F1",
        //     },
        //     secondary: {
        //       DEFAULT: "#e2ddee",
        //       foreground: "#F8F6F1",
        //     },
        //     focus: "#638088",
        //     content1: "#F8F6F1",
        //     content2: "#18160C",
        //   },
        // },
      },
    }),
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
