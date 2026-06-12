export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    list: (filters?: object) => ['products', 'list', filters] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: () => ['categories', 'list'] as const,
    detail: (id: string) => ['categories', 'detail', id] as const,
  },
  inventory: {
    all: ['inventory'] as const,
    movements: () => ['inventory', 'movements'] as const,
  },
  reports: {
    dashboard: () => ['reports', 'dashboard'] as const,
  },
} as const