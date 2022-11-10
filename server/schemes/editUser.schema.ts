import { z } from 'zod'
import { Role } from '@prisma/client'

import { checkLoginAvailability } from '@/server/utils'

export const editUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required')
      .min(3, 'Must be longer than 3')
      .regex(/^[a-zA-Z0-9]+$/g, 'Invalid username')
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email')
      .optional(),
    role: z.nativeEnum(Role).optional(),
    avatar: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    id: z.string().optional(),
  })
  .refine(
    async (data) =>
      await checkLoginAvailability({ login: data.username, id: data.id }),
    {
      message: 'Username is already exists',
      path: ['username'],
    }
  )
  .refine(
    async (data) =>
      await checkLoginAvailability({ login: data.email, id: data.id }),
    {
      message: 'Email is already exists',
      path: ['email'],
    }
  )

export const editUserPasswordAsAdminSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(4, 'Must be longer than 4'),
})
