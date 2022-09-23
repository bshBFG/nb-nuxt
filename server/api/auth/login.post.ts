import { compare } from 'bcrypt'

import type { ILoginRequest } from '@/server/modules/auth'
import { loginSchema, makeSession } from '@/server/modules/auth'
import { getUserWithAuthByLogin } from '@/server/modules/user'
import { postValidate } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<ILoginRequest>(event)

  const errors = await postValidate(loginSchema, body)

  if (errors.hasErrors) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: errors,
      })
    )
  }

  const { login, password } = body

  const user = await getUserWithAuthByLogin(login)

  const isPasswordCorrect = await compare(password, user.auth.passwordHash)

  if (!isPasswordCorrect) {
    errors.hasErrors = true
    errors.data.password = 'Invalid password'

    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Invalid password',
        data: errors,
      })
    )
  }

  return await makeSession(user, event)
})
