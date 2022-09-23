import { destroySession } from '@/server/modules/auth'

export default defineEventHandler((event) => {
  destroySession(event)
  deleteCookie(event, 'session_token')

  return {}
})
