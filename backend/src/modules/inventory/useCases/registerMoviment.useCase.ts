import { IInventoryRepository } from '../repositories/IInventoryRepository';
import { CreateMovementDTO } from '../dtos/createMoviment.dto';
import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';

const schema = z.object({
  produtoId:  z.string().min(1),
  tipo:       z.enum(['ENTRADA', 'SAIDA']),
  quantidade: z.number().int().positive('Quantidade deve ser maior que zero'),
});

export class RegisterMovementUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(data: CreateMovementDTO) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message, 400);

    try {
      return await this.repo.registerMovement(parsed.data);
    } catch (err: any) {
      throw new AppError(err.message || 'Erro ao registrar movimentação.', 400);
    }
  }
}