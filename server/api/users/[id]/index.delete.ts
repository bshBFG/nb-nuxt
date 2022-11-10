import { deleteUser } from '~~/server/prisma/repositories'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const user = await deleteUser(id)

  return user
})
