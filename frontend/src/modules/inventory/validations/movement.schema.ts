import { z } from 'zod'

export const movementSchema = z.object({
  produtoId: z.string().min(1, 'Selecione um produto'),
  tipo: z.enum(['ENTRADA', 'SAIDA']),
  quantidade: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().positive('Quantidade deve ser maior que zero')),
  observacao: z.string().optional(),
})

export type MovementSchema = z.infer<typeof movementSchema>