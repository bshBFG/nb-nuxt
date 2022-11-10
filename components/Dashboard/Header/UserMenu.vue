<script setup lang="ts">
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

  const user = await useUser()
  const logout = logoutUser

  let userAvatar: null | string = null

  if (user && user.avatar) {
    userAvatar = user.avatar
  }
</script>

<template>
  <Popover class="relative">
    <PopoverButton class="outline-none">
      <DashboardAvatar class="h-10 w-10" :src="userAvatar" />
    </PopoverButton>

    <PopoverPanel
      class="w-60 min-h-40 right-0 top-full flex flex-col bg-white absolute z-10 rounded-xl shadow-xl"
    >
      <div class="p-3 flex flex-col border-b border-slate-200">
        <div class="text-center text-sm font-semibold text-slate-500">
          {{ user.username }}
        </div>

        <div class="text-center font-semibold text-slate-800">
          {{ formatUserFullName(user) }}
        </div>

        <div class="text-center text-sm text-slate-500">{{ user.email }}</div>
      </div>

      <div class="p-4 flex justify-center space-x-2">
        <button
          class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:(bg-slate-100)"
        >
          <div class="i-tabler-user h-5 w-5 text-slate-500" />
        </button>

        <button
          class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:(bg-slate-100)"
          @click="logout"
        >
          <div class="i-tabler-logout h-5 w-5 text-slate-500" />
        </button>
      </div>
    </PopoverPanel>
  </Popover>
</template>
