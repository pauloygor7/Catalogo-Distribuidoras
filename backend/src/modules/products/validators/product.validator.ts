import { z } from "zod";

export const createProductSchema = z.object({
  nome:        z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  descricao:   z.string().min(5, 'Descrição muito curta'),
  preco:       z.number().positive('Preço deve ser positivo'),
  categoriaId: z.string().min(1, 'Categoria obrigatória'),
  estoque:     z.number().int().min(0, 'Estoque não pode ser negativo'),
});

export const updateProductSchema = createProductSchema.partial();