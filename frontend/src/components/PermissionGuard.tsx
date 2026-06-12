import { ReactNode } from 'react'
import { usePermission } from '@hooks/usePermission'
import { PERMISSIONS } from '@/constants/roles'

type Resource = keyof typeof PERMISSIONS
type Action<R extends Resource> = keyof (typeof PERMISSIONS)[R]

interface PermissionGuardProps<R extends Resource> {
  resource: R
  action: Action<R>
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard<R extends Resource>({
  resource,
  action,
  children,
  fallback = null,
}: PermissionGuardProps<R>) {
  const { can } = usePermission()

  if (!can(resource, action)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}