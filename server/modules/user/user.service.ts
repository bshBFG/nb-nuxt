import { getUserByLogin, getUserByEmail, getUserByUsername } from '.'

export const doesUserExist = async (login: string): Promise<boolean> => {
  const user = await getUserByLogin(login)

  return user !== null
}

export const doesUsernameExist = async (username: string): Promise<boolean> => {
  try {
    const user = await getUserByUsername(username)

    return user !== null
  } catch (err) {
    return false
  }
}

export const doesEmailExist = async (email: string): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email)

    return user !== null
  } catch (err) {
    return false
  }
}
