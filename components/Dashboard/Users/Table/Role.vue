<script setup lang="ts">
  import { Role } from '.prisma/client'

  interface Props {
    role: Role
  }

  defineProps<Props>()
</script>

<template>
  <div
    class="w-auto h-6 px-3 flex items-center rounded-xl text-sm text-slate-50 bg-slate-600"
  >
    {{ toCapitalize(role) }}
  </div>
</template>
