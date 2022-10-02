import type { IFormError, IRequestError } from '@/server/types'
import type { IAddUserRequest, User } from '@/server/modules/user'

interface IErrorAddUser {
  data: IRequestError<IFormError<IAddUserRequest>>
}

export const addUser = async ({
  username,
  email,
  password,
  confirmPassword,
  role,
  firstName,
  middleName,
  lastName,
  avatar,
}: IAddUserRequest) => {
  try {
    const { data, error } = await useFetch<User, IErrorAddUser>('/api/users', {
      method: 'POST',
      body: {
        username,
        email,
        password,
        confirmPassword,
        role,
        firstName,
        middleName,
        lastName,
        avatar,
      },
      initialCache: false,
    })

    if (error.value) {
      if (typeof error.value === 'boolean') {
        return { hasErrors: true, data: {} }
      }

      return error.value.data.data
    }

    if (data.value) {
      return { hasErrors: false, data: {} }
    }
  } catch (e) {
    console.log('error: ' + e.toString())
  }
}

export const deleteUser = async (id: string) => {
  const fetch = await useFetch(`/api/users/${id}`, {
    method: 'DELETE',
    initialCache: false,
  })
  return fetch
}

export const getUsers = async () => {
  const fetch = await useLazyFetch<User[]>('/api/users')
  return fetch
}
