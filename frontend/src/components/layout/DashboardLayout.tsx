import { ReactNode } from 'react'
import { Sidebar } from '@components/layout/Sidebar'

interface DashboardLayoutProps {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 ml-64 overflow-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}