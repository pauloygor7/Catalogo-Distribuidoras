import { IProductRepository } from '../repositories/IProductRepository';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';
import { updateProductSchema } from '../validators/product.validator';
import { AppError } from '@shared/errors/AppError';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, data: UpdateProductDTO) {
    const parsed = updateProductSchema.safeParse(data);
    if (!parsed.success) throw new AppError(parsed.error.issues[0].message, 400);

    const exists = await this.productRepository.findById(id);
    if (!exists) throw new AppError('Produto não encontrado.', 404);

    await this.productRepository.update(id, parsed.data);
  }
}