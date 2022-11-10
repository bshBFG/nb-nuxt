import { User } from '@prisma/client'

import type {
  IFormParseError,
  ILoginRequest,
  IRequestError,
  ISignupRequest,
} from '~~/server/types'

const AUTH_URL = '/api/auth'

export const useSessionCookie = () => useCookie('session_token')

export const useUser = async () => {
  const authCookie = useSessionCookie().value
  const user = useState<User>('user')

  if (authCookie && !user.value) {
    const data = await $fetch<User>(`${AUTH_URL}/user`, {
      headers: useRequestHeaders(['cookie']) as HeadersInit, // TODO: invalid type https://github.com/nuxt/framework/issues/7549
    })

    user.value = data
  }

  return user.value
}

export async function logoutUser() {
  await useFetch(`${AUTH_URL}/logout`)
  useState('user').value = null
  await useRouter().push('/')
}

interface IErrorSignup {
  data: IRequestError<IFormParseError<ISignupRequest>>
}

export async function signupUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<IFormParseError<ISignupRequest> | null> {
  try {
    const { data, error } = await useFetch<User, IErrorSignup>(
      `${AUTH_URL}/signup`,
      {
        method: 'POST',
        body: { username, email, password, confirmPassword },
        initialCache: false,
      }
    )

    if (error.value) {
      return error.value.data.data
    }

    if (data.value) {
      useState('user').value = data.value
      await useRouter().push('/dashboard')
    }

    return null
  } catch (e) {
    if (e instanceof Error) {
      console.log('error: ' + e.toString())
    }

    return null
  }
}

interface IErrorLogin {
  data: IRequestError<IFormParseError<ILoginRequest>>
}

export const loginUser = async (login: string, password: string) => {
  try {
    const { data, error } = await useFetch<User, IErrorLogin>(
      `${AUTH_URL}/login`,
      {
        method: 'POST',
        body: { login, password },
        initialCache: false,
      }
    )

    if (error.value) {
      return error.value.data.data
    }

    if (data.value) {
      useState('user').value = data.value
      await useRouter().push('/dashboard')
    }

    return null
  } catch (e) {
    if (e instanceof Error) {
      console.log('error: ' + e.toString())
    }

    return null
  }
}
