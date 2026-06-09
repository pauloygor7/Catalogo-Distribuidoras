import { ICategoryRepository } from '../repositories/ICategoryRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new AppError('Categoria não encontrada.', 404);
    await this.repo.delete(id);
  }
}