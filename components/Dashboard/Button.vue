<script setup lang="ts">
  interface Props {
    to?: string
    size?: 'small' | 'medium' | 'large'
    variant?:
      | 'primary'
      | 'outline-primary'
      | 'poor-primary'
      | 'dark'
      | 'outline-dark'
      | 'poor-dark'
      | 'success'
      | 'outline-success'
      | 'poor-success'
      | 'danger'
      | 'outline-danger'
      | 'poor-danger'
    icon?: string
    light?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    to: undefined,
    size: 'medium',
    variant: 'primary',
    type: 'contained',
    icon: undefined,
    light: undefined,
  })

  const defaultClass =
    'w-max min-w-20 flex items-center justify-center rounded-md duration-300 text-sm'
  const small = 'h-8 px-2'
  const medium = 'h-9 px-3'
  const large = 'h-10 px-4'

  const primary =
    'text-white bg-indigo-500 hover:bg-indigo-400 hover:shadow-lg hover-shadow-indigo/70'
  const dark =
    'text-white bg-slate-800 hover:bg-slate-700 hover:shadow-lg hover-shadow-slate/70'
  const success =
    'text-white bg-green-500 hover:bg-green-400 hover:shadow-lg hover-shadow-green/70'
  const danger =
    'text-white bg-red-500 hover:bg-red-400 hover:shadow-lg hover-shadow-red/70'

  const outlinePrimary =
    'border border-indigo-500 text-indigo-500 bg-transparent hover:text-white hover:border-indigo-500 hover:bg-indigo-500 hover:shadow-lg hover-shadow-indigo/70'
  const outlineDark =
    'border border-slate-800 text-slate-800 bg-transparent hover:text-white hover:border-slate-800 hover:bg-slate-800 hover:shadow-lg hover-shadow-slate/70'
  const outlineSuccess =
    'border border-green-500 text-green-500 bg-transparent hover:text-white hover:border-green-500 hover:bg-green-500 hover:shadow-lg hover-shadow-green/70'
  const outlineDanger =
    'border border-red-500 text-red-500 bg-transparent hover:text-white hover:border-red-500 hover:bg-red-500 hover:shadow-lg hover-shadow-red/70'

  const poorPrimary = 'text-indigo-500 bg-transparent'
  const poorDark = 'text-slate-800 bg-transparent'
  const poorSuccess = 'text-green-500 bg-transparent'
  const poorDanger = 'text-red-500 bg-transparent'

  const finalClass = computed(() => {
    let mixClass = defaultClass

    if (props.light) {
      mixClass = `${mixClass} font-normal`
    } else {
      mixClass = `${mixClass} font-medium`
    }

    if (props.size === 'small') {
      mixClass = `${mixClass} ${small}`
    } else if (props.size === 'medium') {
      mixClass = `${mixClass} ${medium}`
    } else if (props.size === 'large') {
      mixClass = `${mixClass} ${large}`
    }

    switch (props.variant) {
      case 'primary':
        mixClass = `${mixClass} ${primary}`
        break
      case 'outline-primary':
        mixClass = `${mixClass} ${outlinePrimary}`
        break
      case 'poor-primary':
        mixClass = `${mixClass} ${poorPrimary}`
        break

      case 'dark':
        mixClass = `${mixClass} ${dark}`
        break
      case 'outline-dark':
        mixClass = `${mixClass} ${outlineDark}`
        break
      case 'poor-dark':
        mixClass = `${mixClass} ${poorDark}`
        break

      case 'success':
        mixClass = `${mixClass} ${success}`
        break
      case 'outline-success':
        mixClass = `${mixClass} ${outlineSuccess}`
        break
      case 'poor-success':
        mixClass = `${mixClass} ${poorSuccess}`
        break

      case 'danger':
        mixClass = `${mixClass} ${danger}`
        break
      case 'outline-danger':
        mixClass = `${mixClass} ${outlineDanger}`
        break
      case 'poor-danger':
        mixClass = `${mixClass} ${poorDanger}`
        break
    }

    return mixClass
  })
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="finalClass">
    <div v-if="icon" class="h-4 w-4 mr-2" :class="icon" />
    <slot>Button</slot>
  </NuxtLink>
  <button v-else :class="finalClass">
    <div v-if="icon" class="h-4 w-4 mr-2" :class="icon" />
    <slot>Button</slot>
  </button>
</template>
