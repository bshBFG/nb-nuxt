import { getUser } from '@/server/modules/user'

export default defineHandler(async (event) => {
  const { id } = getRouterParams(event)
  const user = await getUser(id)

  return user
})
