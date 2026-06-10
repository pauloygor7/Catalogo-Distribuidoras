import { InventoryMoviment } from '../entities/InventoryMoviment';
import { CreateMovementDTO } from '../dtos/createMoviment.dto';

export interface IInventoryRepository {
  registerMovement(data: CreateMovementDTO): Promise<InventoryMoviment>;
  listMovements(): Promise<InventoryMoviment[]>;
  listMovementsByProduct(produtoId: string): Promise<InventoryMoviment[]>;
}