<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })

  const route = useRoute()
  const id = route.params.id as string

  const { data: user } = await getUser(id)
</script>

<template>
  <DashboardBody v-if="user" :title="`Просмотр профиля: @${user.username}`">
    <div class="w-full flex justify-center">
      <div
        class="w-sm p-5 flex flex-col items-center bg-white shadow-xl rounded-xl"
      >
        <div>
          <DashboardAvatar
            :src="user.avatar"
            height="160"
            width="150"
            class="h-40 w-40"
          />
        </div>
        <div class="mt-4 flex flex-col items-center">
          <div class="text-xl font-semibold text-slate-800">
            {{ formatUserFullName(user, { middleName: true }) }}
          </div>

          <div class="font-semibold text-slate-600">
            {{ user.username }}
          </div>

          <div class="text-slate-500">
            {{ user.email }}
          </div>

          <DashboardUsersTableRole :role="user.role" class="mt-2" />
        </div>

        <div class="p-5 flex space-x-4">
          <DashboardButton variant="outline-danger">Удалить</DashboardButton>
          <DashboardButton :to="`/dashboard/users/${id}/edit`"
            >Редактировать</DashboardButton
          >
        </div>
      </div>
    </div>
  </DashboardBody>
</template>
