import { z } from 'zod'

export const productSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  preco: z
    .string()
    .transform((val) => parseFloat(val.replace(',', '.')))
    .pipe(z.number().positive('Preço deve ser maior que zero')),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
  estoque: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(0, 'Estoque não pode ser negativo')),
})

export type ProductSchema = z.infer<typeof productSchema>