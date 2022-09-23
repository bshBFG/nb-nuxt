<script setup lang="ts">
  import { IUser } from '~~/types/user.interface'

  useHead({
    title: null,
    meta: [{ name: 'description', content: 'Niobium template based on Nuxt' }],
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Niobium Nuxt` : 'Niobium Nuxt'
    },
    bodyAttrs: {
      class: 'font-sans',
    },
  })

  await useUser()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  html,
  body,
  #__nuxt {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
