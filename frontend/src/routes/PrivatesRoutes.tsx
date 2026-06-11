import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { ROUTES } from '@/constants/routes'

export function PrivateRoutes() {
    const { user, loading } = useAuth()

    if (loading) {
        return <LoadingScreen />
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}