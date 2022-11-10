export interface ILoginAvailabilityRequest {
  login?: string
  id?: string
}

export interface ILoginAvailabilityResponse {
  isLoginAvailable: boolean
  error: boolean
  message: string
}
