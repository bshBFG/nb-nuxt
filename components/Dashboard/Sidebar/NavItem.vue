<script setup lang="ts">
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue'
  import type { IMenuItem } from '@/data/dashboardSidebarMenu'

  export interface Props {
    item: IMenuItem
  }

  const props = defineProps<Props>()

  const route = useRoute()

  const isItemPathInRoute = computed(() => {
    if (props.item.url === '/dashboard' || props.item.url === '/dashboard/') {
      return route.path === '/dashboard' || route.path === '/dashboard/'
    }

    return route.path.includes(props.item.url)
  })
</script>

<template>
  <NuxtLink
    v-if="!item.children"
    :to="item.url"
    class="h-11 px-4 flex items-center rounded-md text-sm z-10 transition-padding duration-300"
    :class="
      isItemPathInRoute
        ? 'bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo/70 z-20'
        : 'text-slate-600'
    "
    hover="bg-indigo-50 pl-6"
  >
    <span class="mr-4"><div class="h-5 w-5" :class="item.icon" /></span>
    <span>{{ $t(`dashboard.menu.${item.title}`) }}</span>
  </NuxtLink>

  <Disclosure v-else v-slot="{ open }" :default-open="isItemPathInRoute">
    <DisclosureButton
      class="h-11 px-4 flex items-center rounded-md text-sm 'text-slate-600' z-10 transition-padding duration-300"
      :class="open && 'bg-indigo-50'"
      hover="bg-indigo-50 pl-6"
    >
      <span class="mr-4"><div class="h-5 w-5" :class="item.icon" /></span>
      <span>{{ $t(`dashboard.menu.${item.title}`) }}</span>
      <span class="ml-auto"
        ><div
          class="i-tabler-chevron-right h-4 w-4"
          :class="open && 'rotate-90'"
      /></span>
    </DisclosureButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel>
        <NuxtLink
          v-for="child in item.children"
          :key="child.url"
          :to="child.url"
          class="h-11 pl-5 pr-4 flex items-center rounded-md text-sm z-10 transition-padding duration-300"
          active-class="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo/70"
          hover="bg-indigo-50 pl-6"
        >
          <span class="mr-4"><div class="i-tabler-circle h-3 w-3" /></span>
          <span>{{ $t(`dashboard.menu.${child.title}`) }}</span>
        </NuxtLink>
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>

<style scoped>
  .glowing {
    box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%);
  }
</style>
