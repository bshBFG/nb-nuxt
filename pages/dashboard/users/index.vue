<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })
</script>

<template>
  <DashboardBody title="Пользователи">
    <DashboardUsers />
  </DashboardBody>
</template>
