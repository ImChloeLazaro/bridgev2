// tailwind.config.js
import { nextui } from "@nextui-org/react";
import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      zIndex: {
        100: "100",
      },
      width: {
        18: "4.5rem",
      },
      height: {
        18: "4.5rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      scale: {
        "-100": "-1",
      },
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
    display: ["group-hover"],
  },

  plugins: [
    nextui({
      themes: {
        aretex: {
          // extend: "light",
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
              default: "#6B6B72",
              hover: "#565656",
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
            lightblue: {
              default: "#45C2F9",
              hover: "#7dd3fc",
            },
            green: {
              default: "#005D38",
              hover: "#006736",
            },
            red: {
              default: "#E2445B",
              hover: "#AF2140",
            },
            yellow: {
              default: "#FFCF4C",
              hover: "#FFE388",
            },
            purple: {
              default: "#A44BFD",
              hover: "#be80ff",
            },
          },
          boxShadow: {
            base: "0px 2px 12px 0px rgba(0, 0, 0, 0.12)",
          },
        },
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
        ".text-stroke": {
          color: "black",
          "-webkit-text-fill-color":
            "white" /* Will override color (regardless of order) */,
          "-webkit-text-stroke-width": "0.2px",
          "-webkit-text-stroke-color": "black",
        },
        ".text-shadow": {
          "text-shadow":
            "0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)",
          color: "#f9f9f9",
        },
      };
      addUtilities(newUtilities);
    },
    require("tailwindcss-animate"),
  ],
};
