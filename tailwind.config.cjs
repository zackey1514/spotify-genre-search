const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin')
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: { 50: '#e6f7ea', 100: '#c3eacb', 200: '#9cdcaa', 300: '#71cf88', 400: '#4cc46e', 500: '#1DB954', 600: '#10aa4a', 700: '#00973e', 800: '#008633', 900: '#00671e'},
      }
    }
  }
};

module.exports = config;