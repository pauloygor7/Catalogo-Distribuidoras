export const ROLES = {
  ADMIN: 'ADMIN',
  GERENTE: 'GERENTE',
  VENDEDOR: 'VENDEDOR',
} as const

export type Role = keyof typeof ROLES

// Mapa de permissões por recurso
export const PERMISSIONS = {
  products: {
    create: [ROLES.ADMIN, ROLES.GERENTE],
    edit: [ROLES.ADMIN, ROLES.GERENTE],
    delete: [ROLES.ADMIN],
    view: [ROLES.ADMIN, ROLES.GERENTE, ROLES.VENDEDOR],
  },
  categories: {
    create: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    view: [ROLES.ADMIN, ROLES.GERENTE, ROLES.VENDEDOR],
  },
  inventory: {
    create: [ROLES.ADMIN, ROLES.GERENTE],
    view: [ROLES.ADMIN, ROLES.GERENTE, ROLES.VENDEDOR],
  },
  reports: {
    view: [ROLES.ADMIN, ROLES.GERENTE],
    export: [ROLES.ADMIN],
  },
  users: {
    manage: [ROLES.ADMIN],
  },
} as const