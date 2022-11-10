import { getAllUsers } from '~~/server/prisma/repositories'

export default defineEventHandler(() => {
  const users = getAllUsers()

  return users
})
