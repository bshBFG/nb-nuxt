<script setup lang="ts">
  import { Role } from '.prisma/client'

  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'

  const emit = defineEmits(['onAdded'])

  const isOpen = ref(false)

  function setIsOpen(value: boolean) {
    isOpen.value = value
  }

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const firstName = ref('')
  const middleName = ref('')
  const lastName = ref('')
  const avatar = ref('')
  const role = ref<Role>('USER')
  const usernameError = ref<null | string>(null)
  const emailError = ref<null | string>(null)
  const passwordError = ref<null | string>(null)
  const confirmPasswordError = ref<null | string>(null)
  const firstNameError = ref<null | string>(null)
  const middleNameError = ref<null | string>(null)
  const lastNameError = ref<null | string>(null)
  const avatarError = ref<null | string>(null)
  const roleError = ref<null | string>(null)

  const onSubmit = async () => {
    usernameError.value = null
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null
    firstNameError.value = null
    middleNameError.value = null
    lastNameError.value = null
    avatarError.value = null
    roleError.value = null

    const fetch = await addUser({
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      role: role.value,
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      avatar: avatar.value,
    })

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
    } else {
      clearForm()

      emit('onAdded')

      setIsOpen(false)
    }
  }

  const clearForm = () => {
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    role.value = 'USER'
    firstName.value = ''
    middleName.value = ''
    lastName.value = ''
    avatar.value = ''
    usernameError.value = null
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null
    firstNameError.value = null
    middleNameError.value = null
    lastNameError.value = null
    avatarError.value = null
    roleError.value = null
  }
</script>

<template>
  <DashboardButton @click="setIsOpen(true)">Добавить</DashboardButton>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-100" @close="setIsOpen">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-30" />
      </TransitionChild>

      <div class="fixed inset-y-0 right-0 max-w-110 w-full">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="duration-200 ease-in"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <DialogPanel
            class="h-full w-full max-w-lg flex flex-col bg-white shadow-xl overflow-y-auto"
          >
            <div
              class="h-14 p-6 flex items-center justify-between bg-slate-100"
            >
              <DialogTitle class="font-medium text-slate-600">
                Добавить
              </DialogTitle>

              <DashboardButtonIcon
                icon="i-tabler-x"
                @click="setIsOpen(false)"
              />
            </div>

            <div class="flex p-6">
              <form
                autocomplete="off"
                class="w-full flex flex-col gap-8"
                @submit.prevent="onSubmit"
              >
                <DashboardInput
                  v-model="username"
                  :error="usernameError"
                  type="text"
                  placeholder="Логин"
                  icon="i-tabler-user"
                />

                <DashboardInput
                  v-model="email"
                  :error="emailError"
                  type="text"
                  placeholder="Email"
                  icon="i-tabler-mail"
                />

                <DashboardInput
                  v-model="password"
                  :error="passwordError"
                  type="password"
                  placeholder="Пароль"
                  icon="i-tabler-lock"
                />

                <DashboardInput
                  v-model="confirmPassword"
                  :error="confirmPasswordError"
                  type="password"
                  placeholder="Повторите пароль"
                  icon="i-tabler-lock"
                />

                <DashboardInput
                  v-model="firstName"
                  type="text"
                  placeholder="Имя"
                />

                <DashboardInput
                  v-model="middleName"
                  type="text"
                  placeholder="Отчество"
                />

                <DashboardInput
                  v-model="lastName"
                  type="text"
                  placeholder="Фамилия"
                />

                <div class="w-sm flex items-center gap-4">
                  <DashboardAvatar
                    height="120"
                    width="120"
                    class="h-30 w-30"
                    :src="avatar.length !== 0 ? avatar : null"
                  />
                  <div class="flex flex-col">
                    <DashboardInput
                      v-model="avatar"
                      type="text"
                      placeholder="Аватар"
                    />
                    <DashboardButton class="mt-4">Выбрать</DashboardButton>
                  </div>
                </div>

                <div>
                  <DashboardButton ref="firstInputRef" type="submit"
                    >Добавить</DashboardButton
                  >
                </div>
              </form>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
