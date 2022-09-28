import type { User, Role } from '@prisma/client'

import prisma from '@/server/prisma/client'

export { User, Role }

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}

export const getUserWithAuthByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    include: { auth: true },
  })
}

export const getUserWithAuthByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { auth: true },
  })
}

export const getUserWithAuthByLogin = async (login: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
    include: { auth: true },
  })
}

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export const getUserByLogin = async (
  login: User['username'] | User['email']
) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
  })
}

export const createUser = async (
  username: string,
  email: string,
  passwordHash: string
) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      auth: {
        create: {
          passwordHash,
        },
      },
    },
  })

  return user
}

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({})

  return users
}
