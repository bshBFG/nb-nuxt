import { ILoginAvailabilityResponse } from '@/server/types'

export const checkLoginAvailability = async ({
  login,
  email,
  username,
  id,
}: {
  login?: string
  email?: string
  username?: string
  id?: string
}) => {
  const user = await $fetch<ILoginAvailabilityResponse>(
    '/api/auth/login-availability',
    {
      method: 'POST',
      body: {
        login,
        email,
        username,
        id,
      },
    }
  )

  return user.isLoginAvailable
}
