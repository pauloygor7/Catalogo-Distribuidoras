import { ICategoryRepository } from '../repositories/ICategoryRepository';
import { AppError } from '@shared/errors/AppError';
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto';
import { z } from 'zod';

const schema = z.object({
  nome: z.string().min(2, 'Nome muito curto').optional(),
});

export class UpdateCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string, data: UpdateCategoryDTO) {
    const exists = await this.repo.findById(id);

    if (!exists) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      throw new AppError(parsed.error.issues[0].message, 400);
    }

    await this.repo.update(id, parsed.data);
  }
}