import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categoryService } from '@services/categoryService'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { CreateCategoryDTO } from '@/types/category.types'

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories.list(),
    queryFn: categoryService.getAll,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories.all })
      toast.success('Categoria criada com sucesso!')
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories.all })
      toast.success('Categoria removida!')
    },
  })
}