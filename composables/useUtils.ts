import { User } from '@prisma/client'

export const formatUserFullName = (
  user: User,
  { firstName = true, lastName = true, middleName = false } = {}
): string => {
  let name: string | Array<string> = 'unknown'

  if (user.firstName || user.middleName || user.lastName) {
    name = [] as Array<string>

    if (firstName && user.firstName) name.push(user.firstName)
    if (middleName && user.middleName) name.push(user.middleName)
    if (lastName && user.lastName) name.push(user.lastName)

    name = name.join(' ').trim()
  }

  return name
}

export const toCapitalize = (text: string) => {
  const firstLatter = text.charAt(0).toUpperCase()
  const remainingLetters = text.slice(1).toLowerCase()

  return firstLatter + remainingLetters
}

export const toCapitalizeAll = (text: string) => {
  const words = text.split(' ')
  const capitalizedWords = words.map((word) => toCapitalize(word))

  return capitalizedWords.join(' ')
}
