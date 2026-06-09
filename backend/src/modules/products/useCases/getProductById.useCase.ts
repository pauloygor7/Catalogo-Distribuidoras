import { IProductRepository } from '../repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new AppError('Produto não encontrado.', 404);
    return product;
  }
}