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

interface ICreateUser {
  username: string
  email: string
  passwordHash: string
  role?: Role
  firstName?: string
  middleName?: string
  lastName?: string
  avatar?: string
}

export const createUser = async ({
  username,
  email,
  passwordHash,
  role,
  firstName,
  middleName,
  lastName,
  avatar,
}: ICreateUser) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      role,
      firstName,
      middleName,
      lastName,
      avatar,
      auth: {
        create: {
          passwordHash,
        },
      },
    },
  })

  return user
}

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  })
}

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({})

  return users
}
