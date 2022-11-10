import { H3Event } from 'h3'
import { authCheck } from '../services'
import { isStringContainsArrayElement } from '../utils'

const PROTECTED_ROUTES = ['/api/auth/user', '/api/users']

export default defineEventHandler(async (event) => {
  const isAllowed = await protectAuthRoute(event)

  if (!isAllowed) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    )
  }
})

const protectAuthRoute = async (event: H3Event) => {
  if (!isStringContainsArrayElement(event.req.url ?? '', PROTECTED_ROUTES)) {
    return true
  }

  return await authCheck(event)
}
