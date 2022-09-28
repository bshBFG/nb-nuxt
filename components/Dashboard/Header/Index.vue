<script setup lang="ts">
  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const sidebar = useDashboardSidebarStore()
</script>

<template>
  <header class="h-16 m-6 p-4 bg-white shadow-xl rounded-md md:(h-18)">
    <div class="h-full w-full flex justify-self-end items-center gap-2">
      <button
        class="grid place-items-center h-10 w-10 mr-auto rounded-full transition duration-300 hover:(bg-slate-100)"
        @click="sidebar.toggle"
      >
        <div
          v-if="sidebar.isShow"
          class="i-tabler-align-left h-5 w-5 text-slate-500"
        />
        <div v-else class="i-tabler-menu-2 h-5 w-5 text-slate-500" />
      </button>

      <button
        class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:(bg-slate-100)"
      >
        <div class="i-tabler-settings h-5 w-5 text-slate-500" />
      </button>

      <button
        class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:(bg-slate-100)"
      >
        <div class="i-tabler-bell h-5 w-5 text-slate-500" />
      </button>

      <DashboardHeaderUserMenu />
    </div>
  </header>
</template>
