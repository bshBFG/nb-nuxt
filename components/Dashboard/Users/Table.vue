<script setup lang="ts">
  interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    verified: boolean
    status: string
  }

  const users: User[] = [
    {
      id: 'a1',
      firstName: 'Jon',
      lastName: 'Snow',
      email: 'jon@snow.got',
      role: 'admin',
      verified: true,
      status: 'active',
    },
    {
      id: 'a2',
      firstName: 'Obi-Wan',
      lastName: 'Kenobi',
      email: 'obi-wan@kenobi.sw',
      role: 'user',
      verified: false,
      status: 'active',
    },
    {
      id: 'a3',
      firstName: 'Hacker',
      lastName: 'Man',
      email: 'hacker@man.pro',
      role: 'user',
      verified: true,
      status: 'banned',
    },
  ]
</script>

<template>
  <div class="min-w-full overflow-hidden overflow-x-auto">
    <table class="w-full">
      <thead class="bg-slate-50 border-y border-slate-200">
        <tr>
          <th class="p-4 font-semibold text-left">
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
            {{ $t('dashboard.usersTable.role') }}
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-center">
            {{ $t('dashboard.usersTable.verified') }}
          </th>
          <th class="p-4 text-sm font-semibold text-slate-600 text-center">
            {{ $t('dashboard.usersTable.status') }}
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
            <div class="flex items-center">
              <div class="h-10 w-10"><DashboardAvatar class="h-10 w-10" /></div>
              <div class="ml-4 flex flex-col">
                <div class="font-semibold text-slate-700">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
                <div class="text-sm text-slate-600">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td class="p-4 text-slate-600 text-center">{{ user.role }}</td>
          <td class="p-4 text-slate-600 text-center">
            <div class="flex items-center justify-center">
              <div
                v-if="user.verified"
                class="i-tabler-circle-check h-5 w-5 text-green-500"
              />
              <div v-else class="i-tabler-clock h-5 w-5 text-yellow-500" />
            </div>
          </td>
          <td class="p-4 text-slate-600 text-center">{{ user.status }}</td>
          <td class="p-4 text-slate-600">
            <div class="flex items-center justify-center gap-2">
              <button
                class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
              >
                <div class="i-tabler-trash h-5 w-5 text-slate-500" />
              </button>
              <button
                class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
              >
                <div class="i-tabler-edit h-5 w-5 text-slate-500" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
