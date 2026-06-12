import { api } from './api'

export const reportService = {
  async getDashboard() {
    const response = await api.get('/reports/dashboard')
    return response.data
  },

  async exportCSV(): Promise<Blob> {
    const response = await api.get('/reports/export/csv', {
      responseType: 'blob',
    })
    return response.data
  },

  async exportPDF(): Promise<Blob> {
    const response = await api.get('/reports/export/pdf', {
      responseType: 'blob',
    })
    return response.data
  },
}