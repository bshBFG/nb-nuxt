export interface IMenuChildItem {
  title: string
  url: string
}

export interface IMenuItem {
  title: string
  url: string
  icon: string
  children?: Array<IMenuChildItem>
}

export const sidebarMenu = [
  { title: 'Панель управления', url: '/dashboard', icon: 'i-tabler-dashboard' },
  {
    title: 'Пользователи',
    url: '/dashboard/users',
    icon: 'i-tabler-users',
  },
  {
    title: 'Медиа',
    url: '/dashboard/media',
    icon: 'i-tabler-photo',
  },
  {
    title: 'Настройки',
    url: '/dashboard/settings',
    icon: 'i-tabler-settings',
    children: [
      {
        title: 'Общие',
        url: '/dashboard/settings/general',
      },
      {
        title: 'Профиль',
        url: '/dashboard/settings/profile',
      },
    ],
  },
]

export const dashboardSidebarIcons = sidebarMenu.map((i) => i.icon)
