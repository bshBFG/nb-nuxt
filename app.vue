<script setup lang="ts">
  useHead({
    title: 'Niobium',
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

  .dashboard-page-enter-active,
  .dashboard-page-leave-active {
    transition: all 0.4s;
  }
  .dashboard-page-enter-from,
  .dashboard-page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>
