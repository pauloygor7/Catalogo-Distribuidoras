import { lazy, Suspense } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom'

import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { LoadingScreen } from '@components/feedback/LoadingScreen'
import { ROUTES } from '@/constants/routes'

const LoginPage = lazy(() =>
    import('@modules/auth/pages/LoginPage').then((m) => ({
        default: m.LoginPage,
    })),
)

const RegisterPage = lazy(() =>
    import('@modules/auth/pages/RegisterPage').then((m) => ({
        default: m.RegisterPage,
    })),
)

const ForgotPasswordPage = lazy(() =>
    import('@modules/auth/pages/ForgotPasswordPage').then((m) => ({
        default: m.ForgotPasswordPage,
    })),
)

const DashboardPage = lazy(() =>
    import('@modules/dashboard/pages/DashboardPage').then((m) => ({
        default: m.DashboardPage,
    })),
)

const ProductsPage = lazy(() =>
    import('@modules/products/pages/ProductsPage').then((m) => ({
        default: m.ProductsPage,
    })),
)

const ProductFormPage = lazy(() =>
    import('@modules/products/pages/ProductFormPage').then((m) => ({
        default: m.ProductFormPage,
    })),
)

const CategoriesPage = lazy(() =>
    import('@modules/categories/pages/CategoriesPage').then((m) => ({
        default: m.CategoriesPage,
    })),
)

const InventoryPage = lazy(() =>
    import('@modules/inventory/pages/InventoryPage').then((m) => ({
        default: m.InventoryPage,
    })),
)

const ReportsPage = lazy(() =>
    import('@modules/reports/pages/ReportsPage').then((m) => ({
        default: m.ReportsPage,
    })),
)

const withSuspense = (component: React.ReactNode) => (
    <Suspense fallback={<LoadingScreen />}>
        {component}
    </Suspense>
)

const router = createBrowserRouter([
    {
        element: <PublicRoutes />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: withSuspense(<LoginPage />),
            },
            {
                path: ROUTES.REGISTER,
                element: withSuspense(<RegisterPage />),
            },
            {
                path: ROUTES.FORGOT_PASSWORD,
                element: withSuspense(<ForgotPasswordPage />),
            },
        ],
    },
    {
        element: <PrivateRoutes />,
        children: [
            {
                path: ROUTES.DASHBOARD,
                element: withSuspense(<DashboardPage />),
            },
            {
                path: ROUTES.PRODUCTS,
                element: withSuspense(<ProductsPage />),
            },
            {
                path: ROUTES.PRODUCTS_NEW,
                element: withSuspense(<ProductFormPage />),
            },
            {
                path: ROUTES.PRODUCTS_EDIT,
                element: withSuspense(<ProductFormPage />),
            },
            {
                path: ROUTES.CATEGORIES,
                element: withSuspense(<CategoriesPage />),
            },
            {
                path: ROUTES.INVENTORY,
                element: withSuspense(<InventoryPage />),
            },
            {
                path: ROUTES.REPORTS,
                element: withSuspense(<ReportsPage />),
            },
        ],
    },
    {
        path: '/',
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
    },
    {
        path: '*',
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
    },
])

export function AppRouter() {
    return <RouterProvider router={router} />
}