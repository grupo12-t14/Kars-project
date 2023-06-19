/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          100: "#4529E6",
          200: "#5126EA",
          300: "#B0A6F0",
          400: "#EDEAFD",
        },
        gray: {
          0: "#0B0D0D",
          50: "#1b1e1e",
          100: "#212529",
          200: "#495057",
          300: "#868E96",
          400: "#ADB5BD",
          500: "#CED4DA",
          600: "#DEE2E6",
          700: "#E9ECEF",
          800: "#F1F3F5",
          900: "#F8F9FA",
          950: "#FDFDFD",
        },
        feedBack: {
          alert: {
            100: "#CD2B31",
            200: "#FDD8D8",
            300: "#FFE5E5",
          },
          success: {
            100: "#18794E",
            200: "#CCEBD7",
            300: "#DDF3E4",
          },
        },
        random: {
          100: "#E34D8C",
          200: "#C04277",
          300: "#7D2A4D",
          400: "#7000FF",
          500: "#6200E3",
          600: "#36007D",
          700: "#349974",
          800: "#2A7D5F",
          900: "#153D2E",
        },
        whiteFixed: "#FFFFFF",
      },
      fontSize: {
        "typography-20": "1.25rem",
        "typography-25": "1.5625rem",
        "typography-30": "1.875rem",
        "typography-35": "2.1875rem",
        "typography-40": "2.5rem",
        "typography-45": "2.8125rem",
      },
      padding: {
        body: "clamp(15px, 5%, 50px)",
        tags: "clamp(10px, 5%, 25px)",
      },
    },
  },
  paths: {
    "@*": ["./*"],
  },
  darkMode: "class",
  plugins: [],
};
