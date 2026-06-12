import { cn } from '@utils/cn'

interface BadgeProps {
    label: string
    variant?: 'green' | 'red' | 'yellow' | 'blue' | 'gray'
    className?: string
}

const variants = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700',
}

export function Badge({ label, variant = 'gray', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variants[variant],
                className,
            )}
        >
            {label}
        </span>
    )
}