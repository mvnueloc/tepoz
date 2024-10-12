/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff001c",
        secundary: "#F5F5F5",
        tertiary: "#C7C9C9",
        quaternary: "#6A6867",
      },
      height: {
        "100vh-8rem": "calc(100vh - 8rem)",
      },
    },
  },
  plugins: [],
};
