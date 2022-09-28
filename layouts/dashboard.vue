<script setup lang="ts">
  import { breakpointsTailwind } from '@vueuse/core'

  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const { md } = useBreakpoints(breakpointsTailwind)
  const sidebar = useDashboardSidebarStore()
</script>

<template>
  <div class="flex h-full min-h-screen w-full overflow-x-hidden">
    <div class="fixed top-0 left-0 -z-10 h-screen w-screen overflow-hidden">
      <div
        class="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-slate-50"
      />
    </div>

    <DashboardSidebar />

    <div
      class="flex flex-col h-full"
      :class="md && sidebar.isShow ? 'ml-70 w-[calc(100%-17.5rem)]' : 'w-full'"
    >
      <DashboardHeader />

      <div class="p-5 flex flex-auto">
        <NuxtLoadingIndicator />
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
