import { api } from './api'
import { Category, CreateCategoryDTO } from '@/types/category.types'

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get('/categories')
    return response.data
  },

  async create(data: CreateCategoryDTO): Promise<Category> {
    const response = await api.post('/categories', data)
    return response.data
  },

  async update(id: string, data: CreateCategoryDTO): Promise<Category> {
    const response = await api.put(`/categories/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`)
  },
}