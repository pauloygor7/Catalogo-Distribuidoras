import { Product } from '../entities/Product';
import { CreateProductDTO } from '../dtos/createProduct.dto';

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: CreateProductDTO): Promise<Product>;
    delete(id: string): Promise<void>;
}