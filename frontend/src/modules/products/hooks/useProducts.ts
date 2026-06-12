import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { productService } from '@services/productService'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { CreateProductDTO, UpdateProductDTO } from '@types/product.types'

interface UseProductsParams {
  search?: string
  categoriaId?: string
  page?: number
}

export function useProducts(params?: UseProductsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: () => productService.getAll(params),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductDTO) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all })
      toast.success('Produto criado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar produto.')
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
      productService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.detail(id) })
      toast.success('Produto atualizado com sucesso!')
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products.all })
      toast.success('Produto removido com sucesso!')
    },
  })
}