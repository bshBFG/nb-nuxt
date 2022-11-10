<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  })

  const login = ref('')
  const password = ref('')
  const loginError = ref<null | string>(null)
  const passwordError = ref<null | string>(null)

  const postLoginForm = async () => {
    loginError.value = null
    passwordError.value = null

    const fetch = await loginUser(login.value, password.value)

    if (fetch) {
      if (fetch.errors.login) {
        loginError.value = fetch.errors.login
      }

      if (fetch.errors.password) {
        passwordError.value = fetch.errors.password
      }
    }
  }
</script>

<template>
  <div class="w-80 p-4 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Вход</h1>
    <form
      action=""
      class="mt-6 w-full flex flex-col gap-4"
      @submit.prevent="postLoginForm"
    >
      <DashboardInput
        v-model="login"
        placeholder="Логин/Email"
        :error="loginError"
        icon="i-tabler-mail"
      />

      <DashboardInput
        v-model="password"
        type="password"
        placeholder="Пароль"
        :error="passwordError"
        icon="i-tabler-lock"
      />

      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Нет аккаунта?
            <NuxtLink to="/auth/signup" class="text-blue-500 underline">
              Регистрация
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Войти</DashboardButton>
      </div>
    </form>
  </div>
</template>
