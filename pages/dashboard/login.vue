<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  })

  const login = ref('')
  const password = ref('')
  const loginError = ref(null)
  const passwordError = ref(null)

  const postLoginForm = async () => {
    loginError.value = null
    passwordError.value = null

    const errors = await loginUser(login.value, password.value)

    if (errors?.hasErrors) {
      if (errors.data?.login) {
        loginError.value = errors.data.login
      }

      if (errors.data?.password) {
        passwordError.value = errors.data.password
      }
    }
  }
</script>

<template>
  <div class="w-80 p-4 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Log in</h1>
    <form
      action=""
      class="mt-6 w-full flex flex-col gap-4"
      @submit.prevent="postLoginForm"
    >
      <DashboardInput
        v-model="login"
        placeholder="Username/Email"
        :error="loginError"
        icon="i-tabler-mail"
      />

      <DashboardInput
        v-model="password"
        type="password"
        placeholder="Password"
        :error="passwordError"
        icon="i-tabler-lock"
      />

      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Don't have an account?
            <NuxtLink to="/dashboard/signup" class="text-blue-500 underline">
              Sign up
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Login</DashboardButton>
      </div>
    </form>
  </div>
</template>
