/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{hbs,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
} 

/**
 * tailwind.config.js vs postcss.config.js:
 * 
 * tailwind.config.js:
 * - Configures Tailwind CSS specifically
 * - Defines content paths for purging unused styles
 * - Customizes theme (colors, spacing, fonts, etc.)
 * - Adds plugins specific to Tailwind
 * - Controls Tailwind-specific features and behavior
 * 
 * postcss.config.js:
 * - Configures PostCSS, which is a CSS transformation tool
 * - Sets up the processing pipeline for CSS
 * - Includes Tailwind as one of potentially many plugins
 * - Can include other processors like Autoprefixer
 * - Handles the broader CSS processing workflow
 * 
 * Tailwind runs as a PostCSS plugin, which is why both files are needed.
 */