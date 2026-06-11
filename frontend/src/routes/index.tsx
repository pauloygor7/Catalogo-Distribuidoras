import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { LoginPage } from '@modules/auth/pages/LoginPage'
import { RegisterPage } from '@modules/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '@modules/auth/pages/ForgotPasswordPage'
import { DashboardPage } from '@modules/dashboard/pages/DashboardPage'
import { ProductsPage } from '@modules/products/pages/ProductsPage'
import { ProductFormPage } from '@modules/products/pages/ProductFormPage'
import { CategoriesPage } from '@modules/categories/pages/CategoriesPage'
import { InventoryPage } from '@modules/inventory/pages/InventoryPage'
import { ReportsPage } from '@modules/reports/pages/ReportsPage'
import { ROUTES } from '@/constants/routes'

const router = createBrowserRouter([
    {
        element: <PublicRoutes />,
        children: [
            { path: ROUTES.LOGIN, element: <LoginPage /> },
            { path: ROUTES.REGISTER, element: <RegisterPage /> },
            { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
        ],
    },
    {
        element: <PrivateRoutes />,
        children: [
            { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
            { path: ROUTES.PRODUCTS, element: <ProductsPage /> },
            { path: ROUTES.PRODUCTS_NEW, element: <ProductFormPage /> },
            { path: ROUTES.PRODUCTS_EDIT, element: <ProductFormPage /> },
            { path: ROUTES.CATEGORIES, element: <CategoriesPage /> },
            { path: ROUTES.INVENTORY, element: <InventoryPage /> },
            { path: ROUTES.REPORTS, element: <ReportsPage /> },
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