import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@nuxt/image-edge',
    '@unocss/nuxt',
  ],
  css: ['@unocss/reset/tailwind.css'],
  imports: {
    dirs: ['store'],
  },
})
