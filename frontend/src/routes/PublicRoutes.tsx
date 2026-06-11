import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ROUTES } from '@/constants/routes'

export function PublicRoutes() {
    const { user } = useAuth()

    if (user) {
        return <Navigate to={ROUTES.DASHBOARD} replace />
    }

    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    )
}