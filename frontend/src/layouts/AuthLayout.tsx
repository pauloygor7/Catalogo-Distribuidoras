import { ReactNode } from 'react'

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-900">Catálogo Digital</h1>
                    <p className="text-primary-600 text-sm mt-1">Gestão para Distribuidoras</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}