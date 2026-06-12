export interface Product {
  id: string
  nome: string
  descricao: string
  preco: number
  categoriaId: string
  categoriaNome?: string
  estoque: number
  imagemUrl?: string
  createdAt: string
}

export interface CreateProductDTO {
  nome: string
  descricao: string
  preco: number
  categoriaId: string
  estoque: number
  imagemUrl?: string
}

export type UpdateProductDTO = Partial<CreateProductDTO>