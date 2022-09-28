<script setup lang="ts">
  import { User } from '@prisma/client'

  const { data: users, refresh: refreshUsers } = useFetch<User[]>('/api/users')
</script>

<template>
  <div class="w-full border border-slate-100 bg-white rounded-xl shadow-xl">
    <div class="p-6 flex items-center justify-between">
      <div class="flex">
        <span class="font-semibold text-slate-800">{{
          $t('dashboard.usersTable.totalUsers')
        }}</span>
        <span class="ml-2 font-semibold text-slate-600">{{
          users ? users.length : 0
        }}</span>
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="grid place-items-center h-10 w-10 rounded-full transition duration-300 hover:(bg-slate-100)"
          @click="refreshUsers()"
        >
          <div class="i-tabler-refresh h-5 w-5 text-slate-500" />
        </button>

        <DashboardButton to="/dashboard/users/new">{{
          $t('dashboard.button.addUser')
        }}</DashboardButton>
      </div>
    </div>
    <DashboardUsersTable :users="users ?? []" />
  </div>
</template>
