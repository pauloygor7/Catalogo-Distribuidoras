import { Pencil, Trash2 } from 'lucide-react'
import { Product } from '@/types/product.types'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { useDeleteProduct } from '../hooks/useProducts'
import { usePermission } from '@hooks/usePermission'
import { formatCurrency } from '@utils/formatters'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct()
  const { can } = usePermission()

  function handleDelete(id: string) {
    if (confirm('Deseja remover este produto?')) {
      deleteProduct(id)
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estoque
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {product.imagemUrl ? (
                    <img
                      src={product.imagemUrl}
                      alt={product.nome}
                      className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">IMG</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.nome}</p>
                    <p className="text-gray-500 text-xs truncate max-w-[200px]">{product.descricao}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge label={product.categoriaNome ?? 'Sem categoria'} variant="blue" />
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                {formatCurrency(product.preco)}
              </td>
              <td className="px-6 py-4">
                <Badge
                  label={String(product.estoque)}
                  variant={product.estoque <= 5 ? 'red' : product.estoque <= 20 ? 'yellow' : 'green'}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {can('products', 'edit') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {can('products', 'delete') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}