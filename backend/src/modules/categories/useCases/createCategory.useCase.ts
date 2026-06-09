import { ICategoryRepository } from '../repositories/ICategoryRepository';
import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';

const schema = z.object({ nome: z.string().min(2, 'Nome muito curto') });

export class CreateCategoryUseCase {
  constructor(private repo: ICategoryRepository) {}

  async execute(data: { nome: string }) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message, 400);
    return this.repo.create(parsed.data);
  }
}