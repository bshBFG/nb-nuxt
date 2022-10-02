<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'

  import { Role } from '@/server/modules/user'

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
  const usernameError = ref(null)
  const emailError = ref(null)
  const passwordError = ref(null)
  const confirmPasswordError = ref(null)
  const firstNameError = ref(null)
  const middleNameError = ref(null)
  const lastNameError = ref(null)
  const avatarError = ref(null)
  const roleError = ref(null)

  const postAddUserForm = async () => {
    usernameError.value = null
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null
    firstNameError.value = null
    middleNameError.value = null
    lastNameError.value = null
    avatarError.value = null
    roleError.value = null

    const errors = await addUser({
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
  <DashboardButton @click="setIsOpen(true)">{{
    $t('dashboard.button.addUser')
  }}</DashboardButton>

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
                {{ toCapitalizeAll($t('add-new-user')) }}
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
                @submit.prevent="postAddUserForm"
              >
                <DashboardInput
                  v-model="username"
                  :error="usernameError"
                  type="text"
                  placeholder="Username"
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
                  placeholder="Password"
                  icon="i-tabler-lock"
                />

                <DashboardInput
                  v-model="confirmPassword"
                  :error="confirmPasswordError"
                  type="password"
                  placeholder="Confirm Password"
                  icon="i-tabler-lock"
                />

                <DashboardInput
                  v-model="firstName"
                  type="text"
                  placeholder="First Name"
                />

                <DashboardInput
                  v-model="middleName"
                  type="text"
                  placeholder="Middle Name"
                />

                <DashboardInput
                  v-model="lastName"
                  type="text"
                  placeholder="Last Name"
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
                      placeholder="Avatar"
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
