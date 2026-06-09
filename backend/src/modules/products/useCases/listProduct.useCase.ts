import { IProductRepository } from '../repositories/IProductRepository';

export class ListProductsUseCase {
  constructor(private productRepository: IProductRepository) {}
  async execute() { return this.productRepository.findAll(); }
}