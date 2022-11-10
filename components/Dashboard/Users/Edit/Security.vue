<script setup lang="ts">
  import { User } from '.prisma/client'
  interface Props {
    user: User
  }

  const props = defineProps<Props>()

  const newPassword = ref('')
  const newPasswordError = ref<null | string>(null)

  const clearForm = () => {
    newPassword.value = ''
    newPasswordError.value = null
  }

  const onSubmit = async () => {
    newPasswordError.value = null

    const fetch = await updateUserPassword({
      id: props.user.id,
      password: newPassword.value,
    })

    if (fetch) {
      if (fetch.errors.password) {
        newPasswordError.value = fetch.errors.password
      }
    } else {
      clearForm()
    }
  }
</script>

<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="grid md:grid-cols-3 gap-4">
      <div class="flex flex-col space-y-4">
        <DashboardInput
          id="new-password"
          v-model="newPassword"
          type="password"
          label="Новый пароль"
          placeholder="Новый пароль"
          :error="newPasswordError"
        />
      </div>
    </div>
    <div class="mt-6 flex space-x-4">
      <DashboardButton type="submit">Сохранить</DashboardButton>
      <DashboardButton
        type="button"
        variant="outline-primary"
        @click="clearForm"
      >
        Сбросить
      </DashboardButton>
    </div>
  </form>
</template>
