import { useQuery } from '@tanstack/react-query'
import { api } from '@services/api'
import { QUERY_KEYS } from '@/constants/queryKeys'

interface DashboardData {
  totalProdutos: number
  estoqueBaixo: number
  totalCategorias: number
  movimentacoesHoje: number
}

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.reports.dashboard(),
    queryFn: async (): Promise<DashboardData> => {
      const response = await api.get('/reports/dashboard')
      return response.data
    },
  })
}