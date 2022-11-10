import { doesUserExist } from '~~/server/services'
import { ILoginAvailabilityRequest } from '~~/server/types'

export default defineEventHandler(async (event) => {
  const { login, id } = await useBody<ILoginAvailabilityRequest>(event)

  if (typeof login !== 'string' || login.length === 0) {
    return { isLoginAvailable: false, error: true, message: 'Invalid login' }
  }

  const user = await doesUserExist(login, id)

  if (user) {
    return {
      isLoginAvailable: false,
      error: false,
      message: 'Login is not available',
    }
  }

  return { isLoginAvailable: true, error: false, message: 'Login is available' }
})
