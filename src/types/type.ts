export interface Invitation {
  id?: string
  code: string
  name: string
  cellphone: string
  maxGuests: number
  confirmation: boolean
  isAssist: boolean
  countGuests: number
  message: string
  createdAt: Date | string
}

export interface User {
  id?: string
  email: string
  role: string
  createdAt: Date | string
}
