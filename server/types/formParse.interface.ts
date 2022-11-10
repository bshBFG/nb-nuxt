type Input<T> = {
  [Property in keyof T]?: string
}

type Output<T> = T

export type IFormParseSuccess<T> = {
  success: true
  data: Output<T>
}

export type IFormParseError<T> = {
  success: false
  errors: Input<T>
}
