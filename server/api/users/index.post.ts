import { hash } from 'bcrypt'

import { createUser } from '~~/server/prisma/repositories'
import { addUserSchema } from '~~/server/schemes'
import { IAddUserRequest } from '~~/server/types'
import { formValidateAsync } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const body = await useBody<IAddUserRequest>(event)

  const validBody = await formValidateAsync(addUserSchema, body)

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

  const {
    username,
    email,
    password,
    role,
    firstName,
    middleName,
    lastName,
    avatar,
  } = validBody.data

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
