<script setup lang="ts">
  export interface Props {
    isShow: boolean
  }

  defineProps<Props>()
</script>
<template>
  <transition
    enter-active-class="vs-enter-active"
    leave-active-class="vs-leave-active"
    enter-from-class="vs-enter-from"
    leave-to-class="vs-leave-to"
    enter-to-class="vs-enter-to"
    leave-from-class="vs-leave-from"
  >
    <div
      v-if="isShow"
      class="z-10 fixed left-0 top-0 w-screen h-screen bg-black/60 translate-0"
    />
  </transition>
</template>

<style scoped>
  .vs-enter-active,
  .vs-leave-active {
    transition: opacity 0.3s ease;
  }

  .vs-enter-from,
  .vs-leave-to {
    opacity: 0;
  }

  .vs-enter-to,
  .vs-leave-from {
    opacity: 1;
  }
</style>
