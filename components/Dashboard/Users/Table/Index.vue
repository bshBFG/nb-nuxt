<script setup lang="ts">
  import { User } from '@/server/modules/user'

  interface Props {
    users: User[]
  }

  defineProps<Props>()

  defineEmits(['onDeleted'])
</script>

<template>
  <div class="w-full overflow-hidden overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-slate-50 border-y border-slate-200">
        <tr>
          <th class="px-4 font-semibold text-left">
            <div class="flex">
              <button
                class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
              >
                <div class="i-tabler-square h-5 w-5 text-slate-600" />
              </button>
            </div>
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-left">
            {{ $t('dashboard.usersTable.profile') }}
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-center">
            {{ $t('dashboard.usersTable.email') }}
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-center">
            {{ $t('dashboard.usersTable.role') }}
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-left"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr
          v-for="user in users"
          :key="user.id"
          class="transition duration-300 hover:bg-slate-50"
        >
          <td class="p-4">
            <button
              class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
            >
              <div class="i-tabler-square h-5 w-5 text-slate-600" />
            </button>
          </td>
          <td class="p-4">
            <NuxtLink :to="`/dashboard/users/${user.id}`">
              <div class="flex items-center">
                <div class="h-10 w-10">
                  <DashboardAvatar class="h-10 w-10" :src="user.avatar" />
                </div>
                <div class="ml-4 flex flex-col">
                  <div class="font-semibold text-slate-700">
                    {{ formatUserFullName(user) }}
                  </div>
                  <div class="text-sm text-slate-500">@{{ user.username }}</div>
                </div>
              </div>
            </NuxtLink>
          </td>
          <td class="p-4 text-slate-600 text-center">{{ user.email }}</td>
          <td class="p-4 text-slate-600">
            <div class="flex items-center justify-center">
              <DashboardUsersTableRole :role="user.role" />
            </div>
          </td>
          <td class="p-4 text-slate-600">
            <div class="flex items-center justify-center gap-2">
              <DashboardUsersTableDelete
                :user="user"
                @on-deleted="$emit('onDeleted')"
              />
              <NuxtLink
                :to="`/dashboard/users/${user.id}/edit`"
                class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
              >
                <div class="i-tabler-edit h-5 w-5 text-slate-500" />
              </NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
