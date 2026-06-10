import { MovimentType } from "../entities/InventoryMoviment";

export interface CreateMovementDTO {
        produtoId: string;
        tipo: MovimentType;
        quantidade: number;
        observacao?: string;
}