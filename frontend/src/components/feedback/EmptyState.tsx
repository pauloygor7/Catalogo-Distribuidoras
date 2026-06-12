import { PackageOpen } from 'lucide-react'
import { ReactNode } from 'react'

interface EmptyStateProps {
    title: string
    description?: string
    action?: ReactNode
    icon?: ReactNode
}

export function EmptyState({
    title,
    description,
    action,
    icon = <PackageOpen className="h-12 w-12 text-gray-300" />,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4">{icon}</div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    )
}