import * as yup from 'yup'

import { doesEmailExist, doesUsernameExist } from '@/server/modules/user'

export const signupSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Must be longer than 4')
    .test(
      'is-username-exists',
      'Username is already exists',
      async (value) => !(await doesUsernameExist(value))
    ),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .test(
      'is-email-exists',
      'Email is already exists',
      async (value) => !(await doesEmailExist(value))
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Must be longer than 4'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
