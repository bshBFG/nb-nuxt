import { getUser } from '~~/server/prisma/repositories'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const user = await getUser(id)

  return user
})
