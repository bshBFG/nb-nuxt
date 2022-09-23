import { CompatibilityEvent } from 'h3'
import { v4 as uuid } from 'uuid'
import { CookieOptions } from '#app'

import {
  createSession,
  deleteSession,
  getUserBySessionToken,
  getAllUserSessions,
} from '.'
import type { User } from '@/server/modules/user'

export const makeSession = async (user: User, event: CompatibilityEvent) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  const cookieOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    secure: true,
    expires,
  }

  await deleteExtraSession(5, user.id)

  const sessionToken = uuid().replaceAll('-', '')
  const session = await createSession(user.id, sessionToken, expires)
  const userId = session.userId

  if (userId) {
    setCookie(event, 'session_token', sessionToken, cookieOptions)
    return getUserBySessionToken(sessionToken)
  }

  throw new Error('Error Creating Session')
}

export const destroySession = async (event: CompatibilityEvent) => {
  const authToken = getCookie(event, 'session_token')

  await deleteSession(authToken)
}

export const deleteExtraSession = async (
  maxSessions: number,
  userId: string
) => {
  const sessions = await getAllUserSessions(userId)

  if (sessions.length >= maxSessions) {
    const olderSession = sessions.sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
    )[0]

    await deleteSession(olderSession.sessionToken)
  }
}
