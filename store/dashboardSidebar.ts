import { IMenuItem, sidebarMenu } from '~~/data/dashboardSidebarMenu'

export const useDashboardSidebarStore = defineStore('dashboardStore', () => {
  const menu = ref<IMenuItem[]>(sidebarMenu)

  const isShow = ref(false)

  const show = () => {
    isShow.value = true
  }

  const hide = () => {
    isShow.value = false
  }

  const toggle = () => {
    isShow.value = !isShow.value
  }

  return {
    menu,
    isShow,

    show,
    hide,
    toggle,
  }
})
