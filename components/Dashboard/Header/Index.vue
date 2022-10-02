<script setup lang="ts">
  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const sidebar = useDashboardSidebarStore()
</script>

<template>
  <header class="h-16 m-6 p-4 bg-white shadow-xl rounded-md md:(h-18)">
    <div class="h-full w-full flex justify-self-end items-center gap-2">
      <DashboardButtonIcon
        class="mr-auto"
        :icon="sidebar.isShow ? 'i-tabler-align-left' : 'i-tabler-menu-2'"
        @click="sidebar.toggle"
      />

      <DashboardButtonIcon icon="i-tabler-settings" />

      <DashboardButtonIcon icon="i-tabler-bell" />

      <DashboardHeaderUserMenu />
    </div>
  </header>
</template>
