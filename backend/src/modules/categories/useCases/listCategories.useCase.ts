import { ICategoryRepository } from '../repositories/ICategoryRepository';

export class ListCategoriesUseCase {
  constructor(private repo: ICategoryRepository) {}
  async execute() { return this.repo.findAll(); }
}