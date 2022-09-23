import * as yup from 'yup'

import { doesUserExist } from '@/server/modules/user'

export const loginSchema = yup.object({
  login: yup
    .string()
    .required('Username/email is required')
    .min(4, 'Must be longer than 4')
    .test(
      'is-username-exists',
      'Username/email nit found',
      async (value) => await doesUserExist(value)
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Must be longer than 4'),
})
