<script setup lang="ts">
  export interface Props {
    src?: string | null
  }
  defineProps<Props>()
</script>

<template>
  <nuxt-img
    :src="
      typeof src === 'string' && src.length > 0
        ? src
        : '/images/dashboard/media/avatar-default.webp'
    "
    class="object-cover rounded-full overflow-hidden"
    height="40"
    width="40"
  />
</template>
