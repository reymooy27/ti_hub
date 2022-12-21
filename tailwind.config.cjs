/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFD01',
        'secondary': '#282828',
        'background': '#1a1a1a',
        'hover-primary': '#ffff01d2',
        'hover-secondary': '#302e2e',
        'hover-background': '#302f2f'
      }
    },
  },
  plugins: [],
};
