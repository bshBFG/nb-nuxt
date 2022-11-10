<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  })

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const usernameError = ref<null | string>(null)
  const emailError = ref<null | string>(null)
  const passwordError = ref<null | string>(null)
  const confirmPasswordError = ref<null | string>(null)

  const postSignupForm = async () => {
    usernameError.value = null
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null

    const fetch = await signupUser(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    )

    if (fetch) {
      if (fetch.errors.username) {
        usernameError.value = fetch.errors.username
      }

      if (fetch.errors.email) {
        emailError.value = fetch.errors.email
      }

      if (fetch.errors.password) {
        passwordError.value = fetch.errors.password
      }

      if (fetch.errors.confirmPassword) {
        confirmPasswordError.value = fetch.errors.confirmPassword
      }
    }
  }
</script>

<template>
  <div class="w-80 p-4 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Регистрация</h1>
    <form
      action="#"
      method="POST"
      class="mt-6 w-full flex flex-col gap-4"
      @submit.prevent="postSignupForm"
    >
      <DashboardInput
        v-model="username"
        placeholder="Логин"
        :error="usernameError"
        icon="i-tabler-user"
      />

      <DashboardInput
        v-model="email"
        placeholder="Email"
        :error="emailError"
        icon="i-tabler-mail"
      />

      <DashboardInput
        v-model="password"
        type="password"
        placeholder="Пароль"
        :error="passwordError"
        icon="i-tabler-lock"
      />

      <DashboardInput
        v-model="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        :error="confirmPasswordError"
        icon="i-tabler-lock"
      />

      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Уже есть аккаунт?
            <NuxtLink to="/auth/login" class="text-blue-500 underline">
              Войти
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Войти</DashboardButton>
      </div>
    </form>
  </div>
</template>
