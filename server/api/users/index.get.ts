import { getAllUsers } from '@/server/modules/user'

export default defineHandler(() => {
  const users = getAllUsers()

  return users
})
