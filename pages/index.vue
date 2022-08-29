<script setup lang="ts">
  import { useCounterStore } from '@/store/count'

  const counterStore = useCounterStore()
</script>

<template>
  <div class="h-40 w-70 flex flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-600 text-slate-800">Counter from Pinia</h1>
    <div>{{ counterStore.count }}</div>
    <div class="flex gap-2">
      <AppButton @click="counterStore.decrement">decrease</AppButton>
      <AppButton @click="counterStore.increment">increase</AppButton>
    </div>
  </div>
</template>
