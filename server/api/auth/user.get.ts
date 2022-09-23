import { getUserBySessionToken } from '@/server/modules/auth'

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, 'session_token')
  const user = await getUserBySessionToken(sessionToken)

  return user
})
