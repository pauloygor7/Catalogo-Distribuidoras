import { api } from './api'
import { Product, CreateProductDTO, UpdateProductDTO } from '@types/product.types'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface ProductFilters {
  search?: string
  categoriaId?: string
  page?: number
  limit?: number
}

export const productService = {
  async getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const response = await api.get('/products', { params: filters })
    return response.data
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await api.post('/products', data)
    return response.data
  },

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}