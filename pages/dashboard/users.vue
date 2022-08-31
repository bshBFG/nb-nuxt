<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <DashboardBody :title="$t('dashboard.title.users')">
    <div>
      <div class="w-full border border-slate-100 bg-white rounded-xl shadow-xl">
        <div class="p-6 flex items-center justify-between">
          <div class="flex">
            <span class="font-semibold text-slate-800">{{
              $t('dashboard.usersTable.totalUsers')
            }}</span>
            <span class="ml-2 font-semibold text-slate-600">3</span>
          </div>
          <div>
            <DashboardButton>{{
              $t('dashboard.button.addUser')
            }}</DashboardButton>
          </div>
        </div>
        <DashboardUsersTable />
      </div>
    </div>
  </DashboardBody>
</template>
