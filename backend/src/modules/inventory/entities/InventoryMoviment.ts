export type MovimentType = 'ENTRADA' | 'SAIDA';


export interface InventoryMoviment {
    id?: string;
    produtoId: string;
    tipo: MovimentType;
    quantidade: number;
    observacao?: string;
    createdAt?: Date;
}