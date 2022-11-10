import { hash } from 'bcrypt'

import { IUpdateUserPasswordRequest } from '~~/server/types'
import { formValidateAsync } from '~~/server/utils'
import { editUserPasswordAsAdminSchema } from '~~/server/schemes'
import { updateUserPassword } from '~~/server/prisma/repositories'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await useBody<IUpdateUserPasswordRequest>(event)

  const validBody = await formValidateAsync(editUserPasswordAsAdminSchema, body)

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

  const { password } = validBody.data

  const passwordHash: string = await hash(password, 10)

  const user = updateUserPassword({ userId: id, passwordHash })

  return user
})
