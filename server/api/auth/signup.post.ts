import { hash } from 'bcrypt'

import { createUser } from '@/server/modules/user'
import type { ISignupRequest } from '@/server/modules/auth'
import { makeSession, signupSchema } from '@/server/modules/auth'
import { postValidate } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<ISignupRequest>(event)

  const errors = await postValidate(signupSchema, body)

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

  const { username, email, password } = body

  const passwordHash: string = await hash(password, 10)

  const user = await createUser({ username, email, passwordHash })

  return await makeSession(user, event)
})
