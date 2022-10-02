<script setup lang="ts">
  import { breakpointsTailwind } from '@vueuse/core'

  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const { lg } = useBreakpoints(breakpointsTailwind)
  const route = useRoute()

  const sidebar = useDashboardSidebarStore()

  onMounted(() => {
    lg.value ? sidebar.show() : sidebar.hide()
  })

  watch(
    () => lg.value,
    () => {
      !lg.value ? sidebar.hide() : sidebar.show()
    }
  )

  watch(
    () => route.path,
    () => {
      if (!lg.value) {
        sidebar.hide()
      }
    }
  )
</script>

<template>
  <transition>
    <div
      v-if="sidebar.isShow"
      class="fixed top-0 left-0 h-full w-70 z-20 flex flex-col bg-white shadow-xl"
    >
      <div class="p-6">
        <DashboardLogo :with-text="true" />
      </div>
      <div class="flex-auto">
        <div class="p-4">
          <DashboardSidebarNav />
        </div>
      </div>
    </div>
  </transition>

  <Teleport to="body">
    <DashboardSidebarOverlay
      :is-show="sidebar.isShow && !lg"
      @click="sidebar.hide"
    />
  </Teleport>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translateX(-100%);
  }

  .v-enter-to,
  .v-leave-from {
    transform: translateX(0);
  }
</style>
