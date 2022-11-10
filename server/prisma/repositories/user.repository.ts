import type { User, Role } from '@prisma/client'

import prisma from '@/server/prisma/client'

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}

export const getUserWithPasswordByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    include: { password: true },
  })
}

export const getUserWithPasswordByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  })
}

export const getUserWithPasswordByLogin = async (login: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
    include: { password: true },
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
      password: {
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

interface IUpdateUser {
  id: string
  username?: string
  email?: string
  passwordHash?: string
  role?: Role
  firstName?: string
  middleName?: string
  lastName?: string
  avatar?: string
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
}: IUpdateUser) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      role,
      firstName,
      middleName,
      lastName,
      avatar,
    },
  })

  return user
}

interface IUpdateUserPassword {
  userId: string
  passwordHash: string
}

export const updateUserPassword = async ({
  userId,
  passwordHash,
}: IUpdateUserPassword) => {
  await prisma.password.update({
    where: { userId },
    data: {
      passwordHash,
    },
  })

  const user = await getUser(userId)

  return user
}
