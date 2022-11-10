import { z } from 'zod'

import { checkLoginAvailability } from '@/server/utils'

export const loginSchema = z.object({
  login: z
    .string({ required_error: 'Username/email is required' })
    .min(1, 'Username/email is required')
    .min(3, 'Must be longer than 3')
    .refine(async (val) => !(await checkLoginAvailability({ login: val })), {
      message: 'Username/email not found',
    }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(4, 'Must be longer than 4'),
})
