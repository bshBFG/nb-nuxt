import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@nuxt/image-edge',
    '@unocss/nuxt',
    '@intlify/nuxt3',
  ],
  css: ['@unocss/reset/tailwind.css'],
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'ru',
    },
  },
  imports: {
    dirs: ['store'],
  },
})
