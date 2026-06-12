import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { ProductTable } from '../components/ProductTable'
import { useProducts } from '../hooks/useProducts'
import { EmptyState } from '@components/feedback/EmptyState'
import { Skeleton } from '@components/feedback/Skeleton'
import { PermissionGuard } from '@components/PermissionGuard'
import { ROUTES } from '@/constants/routes'
import { Product } from '@/types/product.types'
import { useDebounce } from '@hooks/useDebounce'

export function ProductsPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 400)

    const { data, isLoading } = useProducts({ search: debouncedSearch })

    function handleEdit(product: Product) {
        navigate(ROUTES.PRODUCTS_EDIT.replace(':id', product.id))
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {data?.total ?? 0} produtos cadastrados
                    </p>
                </div>

                <PermissionGuard resource="products" action="create">
                    <Button onClick={() => navigate(ROUTES.PRODUCTS_NEW)}>
                        <Plus className="h-4 w-4" />
                        Novo Produto
                    </Button>
                </PermissionGuard>
            </div>

            {/* Filtros */}
            <div className="w-full max-w-sm">
                <Input
                    placeholder="Buscar produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Tabela */}
            {isLoading ? (
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
            ) : data?.data.length === 0 ? (
                <EmptyState
                    title="Nenhum produto encontrado"
                    description="Crie o primeiro produto para começar"
                    action={
                        <PermissionGuard resource="products" action="create">
                            <Button onClick={() => navigate(ROUTES.PRODUCTS_NEW)}>
                                <Plus className="h-4 w-4" />
                                Criar Produto
                            </Button>
                        </PermissionGuard>
                    }
                />
            ) : (
                <ProductTable products={data?.data ?? []} onEdit={handleEdit} />
            )}
        </div>
    )
}