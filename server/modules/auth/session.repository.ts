import type { Session } from '@prisma/client'

import prisma from '@/server/prisma/client'

export { Session }

export const createSession = async (
  userId: Session['userId'],
  sessionToken: Session['sessionToken'],
  expires: Session['expires']
) => {
  return await prisma.session.create({
    data: {
      userId,
      sessionToken,
      expires,
    },
  })
}

export const deleteSession = async (sessionToken: Session['sessionToken']) => {
  return await prisma.session.delete({ where: { sessionToken } })
}

export const getSessionByToken = async (
  sessionToken: Session['sessionToken']
) => {
  const session = await prisma.session.findUnique({
    where: {
      sessionToken,
    },
  })

  return session
}

export const getAllUserSessions = async (userId: string) => {
  const sessions = await prisma.session.findMany({ where: { userId } })

  return sessions
}

export const getUserBySessionToken = async (
  sessionToken: Session['sessionToken']
) => {
  const user = await prisma.session
    .findFirst({
      where: {
        AND: [{ sessionToken }, { expires: { gt: new Date() } }],
      },
    })
    .user({ include: { profile: true } })

  return user
}
