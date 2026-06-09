import { IProductRepository } from '../repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string) {
    const exists = await this.productRepository.findById(id);
    if (!exists) throw new AppError('Produto não encontrado.', 404);
    await this.productRepository.delete(id);
  }
}