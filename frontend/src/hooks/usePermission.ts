import { useAuth } from './useAuth'
import { PERMISSIONS } from '@/constants/roles'
import { UserRole } from '@types/user.types'

type Resource = keyof typeof PERMISSIONS
type Action<R extends Resource> = keyof (typeof PERMISSIONS)[R]

export function usePermission() {
  const { user } = useAuth()

  function can<R extends Resource>(resource: R, action: Action<R>): boolean {
    if (!user) return false

    const allowedRoles = PERMISSIONS[resource][action] as readonly UserRole[]
    return allowedRoles.includes(user.role)
  }

  function isAdmin(): boolean {
    return user?.role === 'ADMIN'
  }

  return { can, isAdmin }
}