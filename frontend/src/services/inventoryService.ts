import { api } from './api'
import { InventoryMovement, CreateMovementDTO } from '@/types/inventory.types'

export const inventoryService = {
  async getMovements(): Promise<InventoryMovement[]> {
    const response = await api.get('/inventory/movements')
    return response.data
  },

  async createMovement(data: CreateMovementDTO): Promise<InventoryMovement> {
    const response = await api.post('/inventory/movements', data)
    return response.data
  },
}