/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

import { IFormParseError, IFormParseSuccess } from '@/server/types'

export const formValidateAsync = async <
  T extends z.ZodTypeAny,
  B extends object
>(
  schema: T,
  data: B
) => {
  const results = await schema.safeParseAsync(data)
  type IBody = z.infer<T>

  if (results.success === false) {
    const body: IFormParseError<IBody> = {
      success: false,
      errors: {},
    }

    const formatted = results.error.format() as any

    for (const key in formatted) {
      if (key.includes('_')) {
        continue
      }

      body.errors[key as keyof B] = formatted[key]._errors[0]
    }

    return body
  } else {
    const body: IFormParseSuccess<IBody> = {
      success: true,
      data: results.data,
    }

    return body
  }
}
