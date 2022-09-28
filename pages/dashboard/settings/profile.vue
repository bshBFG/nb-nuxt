<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })
</script>

<template>
  <DashboardBody
    :title="$t('dashboard.title.settings-profile')"
  ></DashboardBody>
</template>
