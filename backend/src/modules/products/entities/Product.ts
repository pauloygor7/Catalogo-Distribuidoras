export interface Product {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: string;
    estoque: number;
    imagemUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}