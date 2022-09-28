import type { User } from '@/server/modules/user'
import type { ILoginRequest, ISignupRequest } from '@/server/modules/auth'
import type { IFormError, IRequestError } from '@/server/types'

export const useSessionCookie = () => useCookie('session_token')

export async function useUser() {
  const authCookie = useSessionCookie().value
  const user = useState<User>('user')

  if (authCookie && !user.value) {
    const data = await $fetch<User>(`/api/auth/user`, {
      headers: useRequestHeaders(['cookie']),
    })

    user.value = data
  }

  return user.value
}

export async function logoutUser() {
  await useFetch('/api/auth/logout')
  useState('user').value = null
  await useRouter().push('/')
}

interface IErrorSignup {
  data: IRequestError<IFormError<ISignupRequest>>
}

export const signupUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const { data, error } = await useFetch<User, IErrorSignup>(
      '/api/auth/signup',
      {
        method: 'POST',
        body: { username, email, password, confirmPassword },
        initialCache: false,
      }
    )

    if (error.value) {
      if (typeof error.value === 'boolean') {
        return { hasErrors: true, data: {} }
      }

      return error.value.data.data
    }

    if (data.value) {
      useState('user').value = data.value
      await useRouter().push('/dashboard')
    }
  } catch (e) {
    console.log('error: ' + e.toString())
  }
}

interface IErrorLogin {
  data: IRequestError<IFormError<ILoginRequest>>
}

export const loginUser = async (login: string, password: string) => {
  try {
    const { data, error } = await useFetch<User, IErrorLogin>(
      '/api/auth/login',
      {
        method: 'POST',
        body: { login, password },
        initialCache: false,
      }
    )

    if (error.value) {
      if (typeof error.value === 'boolean') {
        return { hasErrors: true, data: {} }
      }

      return error.value.data.data
    }

    if (data.value) {
      useState('user').value = data.value
      await useRouter().push('/dashboard')
    }
  } catch (e) {
    console.log('error: ' + e.toString())
  }
}
