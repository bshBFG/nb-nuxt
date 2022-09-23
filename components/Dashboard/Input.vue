<script setup lang="ts">
  interface Props {
    modelValue: string
    placeholder: string
    error?: string | null
    icon?: string | null
    type?: 'text' | 'email' | 'password'
  }

  const props = withDefaults(defineProps<Props>(), {
    error: null,
    type: 'text',
    icon: null,
  })

  const isSecureValue = ref(props.type === 'password')

  const toggleValueSecure = () => {
    isSecureValue.value = !isSecureValue.value
  }

  const computedType = computed(() => {
    if (props.type !== 'password') {
      return props.type
    }

    return isSecureValue.value ? 'password' : 'text'
  })

  defineEmits(['update:modelValue'])

  const handleInput = (event: Event) => (event.target as HTMLInputElement).value
</script>

<template>
  <div class="flex flex-col">
    <div
      class="h-10 px-4 flex items-center rounded border transition-500 focus-within:border-blue-400"
      :class="error ? 'border-red-400' : 'border-slate-200'"
    >
      <div v-if="icon" class="h-4 w-4 mr-2 text-slate-500" :class="icon" />
      <input
        :value="modelValue"
        :type="computedType"
        :placeholder="placeholder"
        class="w-full h-full text-lg text-sm outline-none"
        @input="$emit('update:modelValue', handleInput($event))"
      />
      <button type="button" @click="toggleValueSecure">
        <div
          v-if="type === 'password'"
          class="h-4 w-4 mr-2 text-slate-500"
          :class="isSecureValue ? 'i-tabler-eye-off' : 'i-tabler-eye'"
        />
      </button>
    </div>
    <div v-if="error" class="mt-1 text-sm text-red-400">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
</style>
