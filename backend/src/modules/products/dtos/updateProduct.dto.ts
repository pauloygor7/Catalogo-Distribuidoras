export interface UpdateProductDTO {
  nome?:        string;
  descricao?:   string;
  preco?:       number;
  categoriaId?: string;
  estoque?:     number;
  imagemUrl?:   string;
}