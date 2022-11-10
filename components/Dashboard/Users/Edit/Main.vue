<script setup lang="ts">
  import { Role, User } from '.prisma/client'

  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  interface Props {
    user: User
  }

  const props = defineProps<Props>()

  const roles: Array<Role> = ['ADMIN', 'USER']

  const username = ref(props.user.username)
  const email = ref(props.user.email)
  const firstName = ref(props.user.firstName ?? '')
  const middleName = ref(props.user.middleName ?? '')
  const lastName = ref(props.user.lastName ?? '')
  const avatar = ref(props.user.avatar ?? '')
  const role = ref<Role>(props.user.role)

  const usernameError = ref<null | string>(null)
  const emailError = ref<null | string>(null)
  const firstNameError = ref<null | string>(null)
  const middleNameError = ref<null | string>(null)
  const lastNameError = ref<null | string>(null)
  const avatarError = ref<null | string>(null)

  const resetForm = () => {
    username.value = props.user.username
    email.value = props.user.email
    firstName.value = props.user.firstName ?? ''
    middleName.value = props.user.middleName ?? ''
    lastName.value = props.user.lastName ?? ''
    avatar.value = props.user.avatar ?? ''
    role.value = props.user.role
  }

  const onSubmit = async () => {
    usernameError.value = null
    emailError.value = null
    firstNameError.value = null
    middleNameError.value = null
    lastNameError.value = null
    avatarError.value = null

    const fetch = await updateUser({
      id: props.user.id,
      username: username.value,
      email: email.value,
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

      if (fetch.errors.firstName) {
        firstNameError.value = fetch.errors.firstName
      }

      if (fetch.errors.middleName) {
        middleNameError.value = fetch.errors.middleName
      }

      if (fetch.errors.lastName) {
        lastNameError.value = fetch.errors.lastName
      }
    }
  }
</script>

<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="flex space-x-4">
      <DashboardAvatar
        :src="avatar"
        height="90"
        width="90"
        class="h-23 w-23 rounded-md"
      />
      <div class="flex flex-col space-y-4">
        <div class="font-medium text-lg text-slate-600">
          {{ formatUserFullName(user) }}
        </div>
        <div class="flex space-x-4">
          <DashboardButton type="button">Обновить</DashboardButton>
          <DashboardButton type="button" variant="outline-primary"
            >Удалить</DashboardButton
          >
        </div>
      </div>
    </div>
    <div class="mt-6 grid md:grid-cols-3 gap-4">
      <div class="flex flex-col space-y-4">
        <DashboardInput
          id="username"
          v-model="username"
          type="text"
          label="Логин"
          placeholder="Логин"
          :error="usernameError"
        />

        <DashboardInput
          id="email"
          v-model="email"
          type="text"
          label="Email"
          placeholder="Email"
          :error="emailError"
        />
      </div>

      <div class="flex flex-col space-y-4">
        <DashboardInput
          id="firs-name"
          v-model="firstName"
          type="text"
          label="Имя"
          placeholder="Имя"
          :error="firstNameError"
        />
        <DashboardInput
          id="middle-name"
          v-model="middleName"
          type="text"
          label="Отчество"
          placeholder="Отчество"
          :error="middleNameError"
        />
        <DashboardInput
          id="last-name"
          v-model="lastName"
          type="text"
          label="Фамилия"
          placeholder="Фамилия"
          :error="lastNameError"
        />
      </div>

      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <div class="mb-1 text-xs text-slate-600">Роль</div>
          <Listbox v-model="role">
            <ListboxButton
              class="relative w-full h-10 px-4 flex items-center justify-between rounded border cursor-default bg-inherit focus:outline-none transition-500 focus-within:border-blue-400"
            >
              <span>{{ toCapitalize(role) }}</span>
              <span
                ><div class="i-tabler-selector h-5 w-5 text-slate-600"
              /></span>
            </ListboxButton>
            <ListboxOptions
              class="mt-1 w-full bg-white border rounded overflow-hidden"
            >
              <ListboxOption
                v-for="r in roles"
                v-slot="{ active, selected }"
                :key="r"
                :value="r"
                as="template"
              >
                <li
                  class="px-4 h-10 flex items-center justify-between"
                  :class="[
                    selected
                      ? 'bg-indigo-500 text-white'
                      : 'hover:bg-indigo-100 hover:text-indigo-600',
                    active && !selected ? 'bg-indigo-100 text-indigo-600' : '',
                  ]"
                >
                  <span>
                    {{ toCapitalize(r) }}
                  </span>
                  <span>
                    <div v-if="selected" class="i-tabler-check h-4 w-4" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
    </div>
    <div class="mt-6 flex space-x-4">
      <DashboardButton type="submit">Сохранить</DashboardButton>
      <DashboardButton
        type="button"
        variant="outline-primary"
        @click="resetForm"
      >
        Сбросить
      </DashboardButton>
    </div>
  </form>
</template>
