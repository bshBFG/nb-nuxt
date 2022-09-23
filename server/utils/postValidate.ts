import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

import type { IFormError } from '@/server/types'

export const postValidate = async <T extends ObjectShape, B>(
  schema: OptionalObjectSchema<T>,
  body: B
) => {
  const errors: IFormError<B> = {
    hasErrors: false,
    data: {} as B,
  }

  try {
    await schema.validate(body, {
      abortEarly: false,
    })
  } catch (err) {
    errors.hasErrors = true
    if (err.inner) {
      err.inner.forEach((i) => {
        errors.data[i.path] = errors.data[i.path] ?? i.errors[0]
      })
    }
  }

  return errors
}
