import { NuxtError } from '#app'

export interface IRequestError<T> extends NuxtError {
  data: T
}
