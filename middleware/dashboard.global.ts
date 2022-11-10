export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath.includes('dashboard')) {
    to.meta.pageTransition = { name: 'dashboard-page', mode: 'out-in' }
    from.meta.pageTransition = { name: 'dashboard-page', mode: 'out-in' }
  }
})
