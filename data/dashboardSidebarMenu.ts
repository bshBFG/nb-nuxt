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
  { title: 'dashboard', url: '/dashboard', icon: 'i-tabler-dashboard' },
  {
    title: 'users',
    url: '/dashboard/users',
    icon: 'i-tabler-users',
  },
  {
    title: 'media',
    url: '/dashboard/media',
    icon: 'i-tabler-photo',
  },
  {
    title: 'settings',
    url: '/dashboard/settings',
    icon: 'i-tabler-settings',
    children: [
      {
        title: 'general',
        url: '/dashboard/settings/general',
      },
      {
        title: 'profile',
        url: '/dashboard/settings/profile',
      },
    ],
  },
]

export const dashboardSidebarIcons = sidebarMenu.map((i) => i.icon)
