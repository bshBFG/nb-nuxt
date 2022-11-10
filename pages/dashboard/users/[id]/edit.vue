<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })

  const route = useRoute()
  const id = route.params.id as string

  const { data: user } = await getUser(id)
</script>

<template>
  <DashboardBody>
    <DashboardUsersEdit v-if="user" :user="user" />
  </DashboardBody>
</template>
