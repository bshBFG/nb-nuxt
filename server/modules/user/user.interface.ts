import { Role } from '.'

export interface IAddUserRequest {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  role?: Role
  firstName?: string
  middleName?: string
  lastName?: string
  avatar?: string
}
