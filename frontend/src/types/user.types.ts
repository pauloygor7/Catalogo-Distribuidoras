export type UserRole = 'ADMIN' | 'GERENTE' | 'VENDEDOR'

export interface AuthUser {
  uid: string
  email: string | null
  nome: string
  role: UserRole
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}