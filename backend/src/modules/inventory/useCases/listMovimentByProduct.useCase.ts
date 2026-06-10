import { IInventoryRepository } from '../repositories/IInventoryRepository';
import { AppError } from '@shared/errors/AppError';

export class ListMovimentByProductUseCase {
    constructor(private repo: IInventoryRepository) {}

    async execute(id: string) {
        const exists = await this.repo.listMovementsByProduct(id);
        if (!exists) throw new AppError('Produto não encontrado.', 404);
        return exists;
    }
}