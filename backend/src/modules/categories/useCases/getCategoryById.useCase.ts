import { ICategoryRepository } from '../repositories/ICategoryRepository';
import { AppError } from '@shared/errors/AppError';

export class GetCategoryByIdUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(id: string) {
    const category = await this.repo.findById(id);

    if (!category) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    return category;
  }
}