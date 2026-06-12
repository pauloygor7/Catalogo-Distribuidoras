import { LucideIcon } from 'lucide-react'
import { Skeleton } from '@components/feedback/Skeleton'

interface MetricCardProps {
    title: string
    value: number | string
    icon: LucideIcon
    color?: 'blue' | 'green' | 'yellow' | 'red'
    loading?: boolean
}

const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
}

export function MetricCard({ title, value, icon: Icon, color = 'blue', loading }: MetricCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    {loading ? (
                        <Skeleton className="h-8 w-24 mt-1" />
                    ) : (
                        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}