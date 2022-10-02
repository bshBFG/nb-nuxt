<script setup lang="ts">
  const { data: users, refresh, pending } = await getUsers()

  const refreshUsers = () => {
    setTimeout(async () => await refresh(), 300)
  }
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
        <DashboardButtonIcon
          icon="i-tabler-refresh"
          :pending="pending"
          @click="refreshUsers()"
        />

        <DashboardUsersAdd @on-added="refreshUsers" />
      </div>
    </div>
    <DashboardUsersTable :users="users ?? []" @on-deleted="refreshUsers" />
  </div>
</template>
