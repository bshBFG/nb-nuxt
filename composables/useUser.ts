import { User } from '@prisma/client'

import {
  IAddUserRequest,
  IFormParseError,
  IRequestError,
  IUpdateUserPasswordRequest,
  IUpdateUserRequest,
} from '~~/server/types'

const USERS_URL = '/api/users'

export const getUsers = async () => {
  const fetch = await useFetch<User[]>(USERS_URL, {
    headers: useRequestHeaders(['cookie']) as HeadersInit, // TODO: invalid type https://github.com/nuxt/framework/issues/7549
    initialCache: false,
  })
  return fetch
}

export const getUser = async (id: string) => {
  const fetch = await useFetch<User>(`${USERS_URL}/${id}`, {
    headers: useRequestHeaders(['cookie']) as HeadersInit, // TODO: invalid type https://github.com/nuxt/framework/issues/7549
    initialCache: false,
  })

  return fetch
}

interface IErrorAddUser {
  data: IRequestError<IFormParseError<IAddUserRequest>>
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
    const { error } = await useFetch<User, IErrorAddUser>(USERS_URL, {
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
      return error.value.data.data
    }

    return null
  } catch (e) {
    if (e instanceof Error) {
      console.log('error: ' + e.toString())
    }

    return null
  }
}

interface IErrorUpdateUser {
  data: IRequestError<IFormParseError<IUpdateUserRequest>>
}

export const updateUser = async ({
  id,
  username,
  email,
  role,
  firstName,
  middleName,
  lastName,
  avatar,
}: IUpdateUserRequest) => {
  try {
    const { error } = await useFetch<User, IErrorUpdateUser>(
      `${USERS_URL}/${id}`,
      {
        method: 'PUT',
        body: {
          id,
          username,
          email,
          role,
          firstName,
          middleName,
          lastName,
          avatar,
        },
        initialCache: false,
      }
    )

    if (error.value) {
      return error.value.data.data
    }

    return null
  } catch (e) {
    if (e instanceof Error) {
      console.log('error: ' + e.toString())
    }

    return null
  }
}

export const deleteUser = async (id: string) => {
  const fetch = await useFetch(`${USERS_URL}/${id}`, {
    method: 'DELETE',
    initialCache: false,
  })
  return fetch
}

interface IErrorUpdateUserPassword {
  data: IRequestError<IFormParseError<IUpdateUserPasswordRequest>>
}

export const updateUserPassword = async ({
  id,
  password,
}: IUpdateUserPasswordRequest) => {
  try {
    const { error } = await useFetch<User, IErrorUpdateUserPassword>(
      `${USERS_URL}/${id}/password`,
      {
        method: 'PUT',
        body: {
          id,
          password,
        },
        initialCache: false,
      }
    )

    if (error.value) {
      return error.value.data.data
    }

    return null
  } catch (e) {
    if (e instanceof Error) {
      console.log('error: ' + e.toString())
    }

    return null
  }
}
