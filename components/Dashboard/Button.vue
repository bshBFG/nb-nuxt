<script setup lang="ts">
  interface Props {
    to?: string
    size?: 'small' | 'medium' | 'large'
    variant?:
      | 'primary'
      | 'outline-primary'
      | 'success'
      | 'outline-success'
      | 'danger'
      | 'outline-danger'
  }

  const props = withDefaults(defineProps<Props>(), {
    to: undefined,
    size: 'medium',
    variant: 'primary',
    type: 'contained',
  })

  const defaultClass = 'flex items-center rounded-md font-medium duration-300'
  const small = 'h-8 px-2'
  const medium = 'h-9 px-3'
  const large = 'h-10 px-4'

  const primary =
    'text-white bg-indigo-500 hover:bg-indigo-400 hover:shadow-md hover-shadow-indigo'
  const success =
    'text-white bg-green-500 hover:bg-green-400 hover:shadow-md hover-shadow-green'
  const danger =
    'text-white bg-red-500 hover:bg-red-400 hover:shadow-md hover-shadow-red'

  const outlinePrimary =
    'border border-blue-500 text-blue-500 bg-transparent hover:text-white hover:border-blue-400 hover:bg-blue-400 hover:shadow-md hover-shadow-blue'
  const outlineSuccess =
    'border border-green-500 text-green-500 bg-transparent hover:text-white hover:border-green-400 hover:bg-green-400 hover:shadow-md hover-shadow-green'
  const outlineDanger =
    'border border-red-500 text-red-500 bg-transparent hover:text-white hover:border-red-400 hover:bg-red-400 hover:shadow-md hover-shadow-red'

  const finalClass = computed(() => {
    let mixClass = defaultClass

    if (props.size === 'small') {
      mixClass = `${mixClass} ${small}`
    } else if (props.size === 'medium') {
      mixClass = `${mixClass} ${medium}`
    } else if (props.size === 'large') {
      mixClass = `${mixClass} ${large}`
    }

    if (props.variant === 'primary') {
      mixClass = `${mixClass} ${primary}`
    } else if (props.variant === 'outline-primary') {
      mixClass = `${mixClass} ${outlinePrimary}`
    } else if (props.variant === 'success') {
      mixClass = `${mixClass} ${success}`
    } else if (props.variant === 'outline-success') {
      mixClass = `${mixClass} ${outlineSuccess}`
    } else if (props.variant === 'danger') {
      mixClass = `${mixClass} ${danger}`
    } else if (props.variant === 'outline-danger') {
      mixClass = `${mixClass} ${outlineDanger}`
    }

    return mixClass
  })
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="finalClass"
    ><slot>Button</slot></NuxtLink
  >
  <button v-else :class="finalClass">
    <slot>Button</slot>
  </button>
</template>
