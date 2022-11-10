import { H3Event } from 'h3'
import { isString } from '@vueuse/core'

import {
  getUserByLogin,
  getUserByEmail,
  getUserByUsername,
  getUserBySessionToken,
} from '@/server/prisma/repositories'

export const doesUserExist = async (
  login: string,
  id?: string
): Promise<boolean> => {
  const user = await getUserByLogin(login)

  if (user && id && user.id === id) {
    return false
  }

  return user !== null
}

export const doesUsernameExist = async (username: string): Promise<boolean> => {
  try {
    const user = await getUserByUsername(username)

    return user !== null
  } catch (err) {
    return false
  }
}

export const doesEmailExist = async (email: string): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email)

    return user !== null
  } catch (err) {
    return false
  }
}

export async function authCheck(event: H3Event): Promise<boolean> {
  const authToken = getCookie(event, 'session_token')

  const hasAuthToken = isString(authToken)

  if (!hasAuthToken) {
    return false
  }

  const user = await getUserBySessionToken(authToken)

  if (user.id) {
    return true
  }

  return false
}
