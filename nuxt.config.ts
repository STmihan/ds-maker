export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [],
  css: [
      "~/assets/css/fonts.css",
  ],
  ssr: false,
  app: {
    baseURL: '/ds-maker/'
  }
})