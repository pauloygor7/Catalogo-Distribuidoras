import { Package, AlertTriangle, Tag, ArrowUpDown } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { useDashboard } from '../hooks/useDashboard'
import { useAuth } from '@hooks/useAuth'

export function DashboardPage() {
    const { data, isLoading } = useDashboard()
    const { user } = useAuth()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Bem-vindo, {user?.nome}</p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <MetricCard
                    title="Total de Produtos"
                    value={data?.totalProdutos ?? 0}
                    icon={Package}
                    color="blue"
                    loading={isLoading}
                />
                <MetricCard
                    title="Estoque Baixo"
                    value={data?.estoqueBaixo ?? 0}
                    icon={AlertTriangle}
                    color="red"
                    loading={isLoading}
                />
                <MetricCard
                    title="Categorias"
                    value={data?.totalCategorias ?? 0}
                    icon={Tag}
                    color="green"
                    loading={isLoading}
                />
                <MetricCard
                    title="Movimentações Hoje"
                    value={data?.movimentacoesHoje ?? 0}
                    icon={ArrowUpDown}
                    color="yellow"
                    loading={isLoading}
                />
            </div>
        </div>
    )
}