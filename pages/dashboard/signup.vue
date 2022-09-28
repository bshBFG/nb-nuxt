<script setup lang="ts">
  definePageMeta({
    middleware: ['guest'],
  })

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const usernameError = ref(null)
  const emailError = ref(null)
  const passwordError = ref(null)
  const confirmPasswordError = ref(null)

  const postSignupForm = async () => {
    usernameError.value = null
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null

    const errors = await signupUser(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    )

    if (errors?.hasErrors) {
      if (errors.data?.username) {
        usernameError.value = errors.data.username
      }

      if (errors.data?.email) {
        emailError.value = errors.data.email
      }

      if (errors.data?.password) {
        passwordError.value = errors.data.password
      }

      if (errors.data?.confirmPassword) {
        confirmPasswordError.value = errors.data.confirmPassword
      }
    }
  }
</script>

<template>
  <div class="w-80 p-4 flex flex-col items-center">
    <h1 class="text-2xl font-semibold text-slate-800">Sign up</h1>
    <form
      action="#"
      method="POST"
      class="mt-6 w-full flex flex-col gap-4"
      @submit.prevent="postSignupForm"
    >
      <DashboardInput
        v-model="username"
        placeholder="Username"
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
        placeholder="Password"
        :error="passwordError"
        icon="i-tabler-lock"
      />

      <DashboardInput
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        :error="confirmPasswordError"
        icon="i-tabler-lock"
      />

      <div class="flex flex-col items-center gap-4">
        <div class="text-center text-sm text-slate-400">
          <span
            >Already have an account?
            <NuxtLink to="/dashboard/login" class="text-blue-500 underline">
              Log in
            </NuxtLink>
          </span>
        </div>
        <DashboardButton>Signup</DashboardButton>
      </div>
    </form>
  </div>
</template>
