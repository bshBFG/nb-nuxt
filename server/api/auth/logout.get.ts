import { destroySession } from '~~/server/services'

export default defineEventHandler((event) => {
  destroySession(event)
  deleteCookie(event, 'session_token')

  return {}
})
