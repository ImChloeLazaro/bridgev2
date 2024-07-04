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
        background: "rgb(var(--aretex-background) / <alpha-value>)",
        foreground: "var(--aretex-foreground)",
        darkblack: "var(--aretex-darkblack)",
        heart: "var(--aretex-heart)",
        happy: "var(--aretex-happy)",
        inactive: "var(--aretex-inactive)",
        white: {
          default: "rgb(var(--aretex-white) / <alpha-value>)",
          hover: "rgb(var(--aretex-white-hover) / <alpha-value>)",
        },
        black: {
          default: "rgb(var(--aretex-black) / <alpha-value>)",
          hover: "rgb(var(--aretex-black-hover) / <alpha-value>)",
          darker: "rgb(var(--aretex-black-darker) / <alpha-value>)",
        },
        grey: {
          default: "rgb(var(--aretex-grey) / <alpha-value>)",
          hover: "rgb(var(--aretex-grey-hover) / <alpha-value>)",
        },
        darkgrey: {
          default: "rgb(var(--aretex-darkgrey) / <alpha-value>)",
          hover: "rgb(var(--aretex-darkgrey-hover) / <alpha-value>)",
        },
        lightgrey: {
          default: "rgb(var(--aretex-lightgrey) / <alpha-value>)",
          hover: "rgb(var(--aretex-lightgrey-hover) / <alpha-value>)",
        },
        orange: {
          default: "rgb(var(--aretex-orange) / <alpha-value>)",
          hover: "rgb(var(--aretex-orange-hover) / <alpha-value>)",
        },
        blue: {
          default: "rgb(var(--aretex-blue) / <alpha-value>)",
          hover: "rgb(var(--aretex-blue-hover) / <alpha-value>)",
        },
        yellow: {
          default: "rgb(var(--aretex-yellow) / <alpha-value>)",
          hover: "rgb(var(--aretex-yellow-hover) / <alpha-value>)",
        },
        lightblue: {
          default: "rgb(var(--aretex-lightblue) / <alpha-value>)",
          hover: "rgb(var(--aretex-lightblue-hover) / <alpha-value>)",
        },
        green: {
          default: "rgb(var(--aretex-green) / <alpha-value>)",
          hover: "rgb(var(--aretex-green-hover) / <alpha-value>)",
        },
        red: {
          default: "rgb(var(--aretex-red) / <alpha-value>)",
          hover: "rgb(var(--aretex-red-hover) / <alpha-value>)",
        },
        purple: {
          default: "rgb(var(--aretex-purple) / <alpha-value>)",
          hover: "rgb(var(--aretex-purple-hover) / <alpha-value>)",
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
            danger: "#E2445B",
            // background: "#D9D9D9",
            // foreground: "#393939",
            // white: {
            //   default: "#F9F9F9",
            //   hover: "#888888",
            // },
            // black: {
            //   default: "#393939",
            //   hover: "#6D6D6D",
            //   darker: "#202020",
            // },
            // grey: {
            //   default: "#EFEFEF",
            //   hover: "#D0D0D0",
            // },
            // darkgrey: {
            //   default: "#6B6B72",
            //   hover: "#565656",
            // },
            // lightgrey: {
            //   default: "#A1A1AA",
            //   hover: "#E1E2E4",
            // },
            // orange: {
            //   default: "#EF8B16",
            //   hover: "#BA5914",
            // },
            // blue: {
            //   default: "#32449C",
            //   hover: "#547FDD",
            // },
            // lightblue: {
            //   default: "#45C2F9",
            //   hover: "#7dd3fc",
            // },
            // green: {
            //   default: "#005D38",
            //   hover: "#006736",
            // },
            // red: {
            //   default: "#E2445B",
            //   hover: "#AF2140",
            // },
            // yellow: {
            //   default: "#FFCF4C",
            //   hover: "#FFE388",
            // },
            purples: {
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
  ],
};
