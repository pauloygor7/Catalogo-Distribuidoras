import { IInventoryRepository } from '../repositories/IInventoryRepository';

export class ListMovimentsUseCase {
    constructor(private repo: IInventoryRepository) {}
    async execute() { return this.repo.listMovements(); }
}