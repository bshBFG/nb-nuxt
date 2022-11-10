import { compare } from 'bcrypt'

import { getUserWithPasswordByLogin } from '~~/server/prisma/repositories'
import { loginSchema } from '~~/server/schemes'
import { makeSession } from '~~/server/services'
import { ILoginRequest } from '~~/server/types'
import { formValidateAsync } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<ILoginRequest>(event)

  const validBody = await formValidateAsync(loginSchema, body)

  if (!validBody.success) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: validBody,
      })
    )
  }

  const { login, password } = validBody.data

  const user = await getUserWithPasswordByLogin(login)

  if (!user || !user.password) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    )
  }

  const isPasswordCorrect = await compare(password, user.password.passwordHash)

  if (!isPasswordCorrect) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Invalid password',
        data: {
          success: false,
          errors: {
            password: 'Invalid password',
          },
        },
      })
    )
  }

  return await makeSession(user, event)
})
