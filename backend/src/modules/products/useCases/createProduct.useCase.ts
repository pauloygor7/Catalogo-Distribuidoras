import { IProductRepository } from '../repositories/IProductRepository';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { createProductSchema } from '../validators/product.validator';
import { AppError } from '@shared/errors/AppError';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: CreateProductDTO) {
    const parsed = createProductSchema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message, 400);
    return this.productRepository.create(parsed.data);
  }
}