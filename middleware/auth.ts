export default defineNuxtRouteMiddleware(async (to) => {
  const user = await useUser()

  if (user === null || user === undefined) {
    if (to.fullPath.includes('dashboard')) {
      return navigateTo('/dashboard/login')
    }

    return navigateTo('/')
  }
})
