import { getUser } from '@/server/modules/user'

export default defineHandler((event) => {
  const { id } = getRouterParams(event)
  const user = getUser(id)

  return user
})
