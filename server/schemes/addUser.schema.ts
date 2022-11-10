import { z } from 'zod'
import { Role } from '@prisma/client'

import { checkLoginAvailability } from '@/server/utils'

export const addUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required')
      .min(3, 'Must be longer than 3')
      .regex(/^[a-zA-Z0-9]+$/g, 'Invalid username')
      .refine(async (val) => await checkLoginAvailability({ login: val }), {
        message: 'Username is already exists',
      }),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email')
      .refine(async (val) => await checkLoginAvailability({ login: val }), {
        message: 'Email is already exists',
      }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required')
      .min(4, 'Must be longer than 4'),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, 'Confirm password is required')
      .min(4, 'Must be longer than 4'),
    role: z.nativeEnum(Role).optional(),
    avatar: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
