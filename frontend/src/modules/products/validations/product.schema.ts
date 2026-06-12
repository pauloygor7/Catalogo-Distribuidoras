import { z } from 'zod'

export const productSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  preco: z.coerce.number().positive('Preço deve ser maior que zero'),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
  estoque: z.coerce.number().min(0, 'Estoque não pode ser negativo'),
  imagemUrl: z.string().optional(),
})

export type ProductFormInput = z.input<typeof productSchema>
export type ProductSchema = z.infer<typeof productSchema>