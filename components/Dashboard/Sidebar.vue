<script setup lang="ts">
  import { breakpointsTailwind } from '@vueuse/core'

  import SidebarOverlay from './SidebarOverlay.vue'
  import { useDashboardSidebarStore } from '@/store/dashboardSidebar'

  const { md } = useBreakpoints(breakpointsTailwind)
  const route = useRoute()

  const sidebar = useDashboardSidebarStore()

  onBeforeMount(() => {
    md.value ? sidebar.show() : sidebar.hide()
  })

  watch(
    () => md.value,
    () => {
      !md.value ? sidebar.hide() : sidebar.show()
    }
  )

  watch(
    () => route.path,
    () => {
      if (!md.value) {
        sidebar.hide()
      }
    }
  )
</script>

<template>
  <ClientOnly>
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
        :is-show="sidebar.isShow && !md"
        @click="sidebar.hide"
      />
    </Teleport>
  </ClientOnly>
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
