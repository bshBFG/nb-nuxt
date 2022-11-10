import { hash } from 'bcrypt'

import { createUser } from '~~/server/prisma/repositories'
import { signupSchema } from '~~/server/schemes'
import { makeSession } from '~~/server/services'
import { ISignupRequest } from '~~/server/types'
import { formValidateAsync } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<ISignupRequest>(event)

  const validBody = await formValidateAsync(signupSchema, body)

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

  const { username, email, password } = validBody.data

  const passwordHash: string = await hash(password, 10)

  const user = await createUser({ username, email, passwordHash })

  return await makeSession(user, event)
})
