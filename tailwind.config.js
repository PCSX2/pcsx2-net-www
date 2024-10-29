const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
        container: false,
    },
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        // next-ui
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    darkMode: ["class", '[data-theme="dark"]'],
    plugins: [nextui({
        themes: {
          light: {
            colors: {
              background: "#FFFFFF", // or DEFAULT
              foreground: "#11181C", // or 50 to 900 DEFAULT
              primary: {
                //... 50 to 900
                foreground: "#FFFFFF",
                DEFAULT: "#006FEE",
              },
              // ... rest of the colors
            },
          },
          dark: {
            colors: {
              background: "#010409", // or DEFAULT
              foreground: "#ECEDEE", // or 50 to 900 DEFAULT
              primary: {
                //... 50 to 900
                foreground: "#FFFFFF",
                DEFAULT: "#006FEE",
              },
            },
            // ... rest of the colors
          }
        },
      }),
      function ({ addComponents }) {
        addComponents({
          '.container': {
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '640px',
            },
            '@screen md': {
              maxWidth: '768px',
            },
            '@screen lg': {
              maxWidth: '1280px',
            },
            '@screen xl': {
              maxWidth: '1600px',
            },
          }
        })
      }]
}