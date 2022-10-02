<script setup lang="ts">
  interface Props {
    icon?: string
    pending?: boolean
  }

  defineProps<Props>()
</script>
<template>
  <button
    :disabled="pending"
    class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:bg-slate-100"
  >
    <div
      v-if="!pending"
      class="h-5 w-5 text-slate-500 hover:text-slate-600 transition duration-300"
      :class="icon ? icon : 'i-tabler-circle'"
    />
    <div
      v-else
      class="i-tabler-fidget-spinner animate-spin h-5 w-5 text-slate-500 hover:text-slate-600 transition duration-300"
    />
  </button>
</template>
