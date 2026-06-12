export type MovementType = 'ENTRADA' | 'SAIDA'

export interface InventoryMovement {
  id: string
  produtoId: string
  produtoNome: string
  tipo: MovementType
  quantidade: number
  estoqueAnterior: number
  estoqueAtual: number
  createdAt: string
  criadoPor: string
}

export interface CreateMovementDTO {
  produtoId: string
  tipo: MovementType
  quantidade: number
  observacao?: string
}