import { deleteUser } from '@/server/modules/user'

export default defineHandler(async (event) => {
  const { id } = getRouterParams(event)
  const user = await deleteUser(id)

  return user
})
