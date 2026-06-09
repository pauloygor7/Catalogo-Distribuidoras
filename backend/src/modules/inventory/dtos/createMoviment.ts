import { MovimentType } from "../entities/InventoryMoviment";

export interface InventoryMoviment {
        produtoId: string;
        tipo: MovimentType;
        quantidade: number;
        observacao?: string;
}