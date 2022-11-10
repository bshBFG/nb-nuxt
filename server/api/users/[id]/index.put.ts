import { updateUser } from '~~/server/prisma/repositories'
import { editUserSchema } from '~~/server/schemes'
import { IUpdateUserRequest } from '~~/server/types'
import { formValidateAsync } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await useBody<IUpdateUserRequest>(event)

  const validBody = await formValidateAsync(editUserSchema, body)

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

  const { username, email, role, firstName, middleName, lastName, avatar } =
    validBody.data

  const user = await updateUser({
    id,
    username,
    email,
    role,
    firstName,
    lastName,
    middleName,
    avatar,
  })

  return user
})
