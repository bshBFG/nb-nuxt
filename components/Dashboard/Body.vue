<script setup lang="ts">
  export interface Props {
    title?: string
  }

  defineProps<Props>()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div v-if="title">
      <h1 class="mb-4 text-2xl font-semibold text-slate-800">
        {{ title }}
      </h1>
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
