import { db } from '@shared/infra/firebase/firebase.config';
import { IProductRepository } from './IProductRepository';
import { Product } from '../entities/Product';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';

export class FirebaseProductRepository implements IProductRepository {
  private col = db.collection('products');

  async create(data: CreateProductDTO): Promise<Product> {
    const docRef = await this.col.add({ ...data, createdAt: new Date(), updatedAt: new Date() });
    return { id: docRef.id, ...data };
  }

  async findAll(): Promise<Product[]> {
    const snap = await this.col.orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this.col.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Product;
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const docRef = this.col.doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error('Produto não encontrado');
    }

    const currentProduct = {
      id: doc.id,
      ...doc.data()
    } as Product;

    const updatedProduct: Product = {
      ...currentProduct,
      ...data,
      updatedAt: new Date()
    };

    await docRef.update({
      ...data,
      updatedAt: updatedProduct.updatedAt
    });

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.col.doc(id).delete();
  }

  async findByCategory(categoriaId: string): Promise<Product[]> {
    const snap = await this.col.where('categoriaId', '==', categoriaId).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
  }
}