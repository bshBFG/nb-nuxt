import { Role } from '@prisma/client'

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

export interface IUpdateUserRequest {
  id?: string
  username?: string
  email?: string
  role?: Role
  firstName?: string
  middleName?: string
  lastName?: string
  avatar?: string
}

export interface IUpdateUserPasswordRequest {
  id?: string
  password?: string
  confirmPassword?: string
}
