import { Product } from '../entities/Product';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: UpdateProductDTO): Promise<Product>;
    delete(id: string): Promise<void>;
    findByCategory(categoriaId: string): Promise<Product[]>;
}