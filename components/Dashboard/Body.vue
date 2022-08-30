<script setup lang="ts">
  export interface Props {
    title: string
  }

  defineProps<Props>()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div>
      <h1 class="text-2xl font-semibold text-slate-800">
        {{ title }}
      </h1>
    </div>
    <div class="mt-4 flex-1">
      <slot />
    </div>
  </div>
</template>
