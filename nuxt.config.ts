export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [],
  css: [
      "~/assets/css/fonts.css",
  ],
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'DS Maker',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})