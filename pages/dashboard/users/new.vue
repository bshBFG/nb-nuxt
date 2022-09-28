<script setup lang="ts">
  import { User, Role } from '@/server/modules/user'

  definePageMeta({
    layout: 'dashboard',
    middleware: ['auth'],
  })
  const route = useRoute()
  const id = route.params.id

  const { data: user } = await useFetch<User>(`/api/users/${id}`, {
    initialCache: false,
  })

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const firstName = ref('')
  const middleName = ref('')
  const lastName = ref('')
  const role = ref<Role>('USER')
</script>

<template>
  <DashboardBody title="Новый пользователь">
    <div class="w-full flex">
      <div class="w-full p-5 flex flex-col bg-white shadow-xl rounded-xl">
        <div class="flex">
          <form class="w-full flex gap-8" @submit.prevent="">
            <div class="w-sm flex flex-col gap-4">
              <DashboardInput
                v-model="username"
                type="text"
                placeholder="Username"
                icon="i-tabler-user"
              />

              <DashboardInput
                v-model="email"
                type="text"
                placeholder="Email"
                icon="i-tabler-mail"
              />

              <DashboardInput
                v-model="password"
                type="password"
                placeholder="Password"
                icon="i-tabler-lock"
              />

              <DashboardInput
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                icon="i-tabler-lock"
              />
            </div>
            <div class="w-sm flex flex-col gap-4">
              <DashboardInput
                v-model="username"
                type="text"
                placeholder="First Name"
              />

              <DashboardInput
                v-model="email"
                type="text"
                placeholder="Middle Name"
              />

              <DashboardInput
                v-model="password"
                type="password"
                placeholder="Last Name"
              />
            </div>
            <div class="w-sm flex flex-col gap-4">
              <DashboardAvatar height="160" width="160" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardBody>
</template>
