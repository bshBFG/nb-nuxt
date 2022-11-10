<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })
</script>

<template>
  <DashboardBody title="Настройки"></DashboardBody>
</template>
