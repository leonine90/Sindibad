export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/styles.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-12-22',
});