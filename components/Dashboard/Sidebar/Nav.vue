<script setup lang="ts">
  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const { menu } = useDashboardSidebarStore()
</script>

<template>
  <div class="flex flex-col font-medium text-slate-600">
    <DashboardSidebarNavItem
      v-for="item in menu"
      :key="item.url"
      :item="item"
    />
  </div>
</template>
