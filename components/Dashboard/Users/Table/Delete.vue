<script setup lang="ts">
  import { User } from '.prisma/client'

  import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  } from '@headlessui/vue'

  const isOpen = ref(false)

  interface Props {
    user: User
  }

  const props = defineProps<Props>()

  const emit = defineEmits(['onDeleted'])

  const setIsOpen = (value: boolean) => {
    isOpen.value = value
  }

  const onDeleteUser = async () => {
    await deleteUser(props.user.id)

    emit('onDeleted')

    setIsOpen(false)
  }
</script>

<template>
  <button
    class="w-10 h-10 grid place-items-center rounded-full transition duration-300 hover:bg-slate-100"
    @click="setIsOpen(true)"
  >
    <div class="i-tabler-trash h-5 w-5 text-slate-500" />
  </button>

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

      <div class="fixed inset-0 grid place-items-center">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-90"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-90"
        >
          <DialogPanel
            class="w-full max-w-md m-4 p-6 flex flex-col space-y-4 bg-white shadow-xl overflow-y-auto rounded-md"
          >
            <div
              class="flex flex-col items-center space-y-2 font-medium text-slate-800 text-center"
            >
              <div>Вы действительно хотите удалить пользователя?</div>
              <div
                class="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full w-min"
              >
                @{{ user.username }}
              </div>
            </div>
            <div class="flex justify-center space-x-4">
              <DashboardButton
                variant="outline-primary"
                @click="setIsOpen(false)"
                >Нет</DashboardButton
              >
              <DashboardButton @click="onDeleteUser">Да</DashboardButton>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
