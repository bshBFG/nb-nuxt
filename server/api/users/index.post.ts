import { hash } from 'bcrypt'

import type { IAddUserRequest } from '@/server/modules/user'
import { addUserSchema, createUser } from '@/server/modules/user'
import { postValidate } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<IAddUserRequest>(event)

  const errors = await postValidate(addUserSchema, body)

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

  const {
    username,
    email,
    password,
    role,
    firstName,
    middleName,
    lastName,
    avatar,
  } = body

  const passwordHash: string = await hash(password, 10)

  const user = await createUser({
    username,
    email,
    passwordHash,
    role,
    firstName,
    lastName,
    middleName,
    avatar,
  })

  return user
})
