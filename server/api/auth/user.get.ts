import { getUserBySessionToken } from '~~/server/prisma/repositories'

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, 'session_token')

  if (!sessionToken) {
    return null
  }

  const user = await getUserBySessionToken(sessionToken)

  return user
})
