export interface CreateProductDTO {
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: string;
  estoque: number;
}