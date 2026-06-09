import { db } from '@shared/infra/firebase/firebase.config';
import { ICategoryRepository } from './ICategoryRepository';
import { Category } from '../entities/Category';
import { CreateCategoryDTO } from '../dtos/createCategory.dto';
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto';

export class FirebaseCategoryRepository implements ICategoryRepository {
  private col = db.collection('categories');

  async create(data: CreateCategoryDTO): Promise<Category> {
    const ref = await this.col.add({ ...data, createdAt: new Date() });
    return { id: ref.id, ...data };
  }

  async findAll(): Promise<Category[]> {
    const snap = await this.col.orderBy('nome').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
  }

  async findById(id: string): Promise<Category | null> {
    const doc = await this.col.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Category;
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const docRef = this.col.doc(id);
  
    const doc = await docRef.get();
  
    if (!doc.exists) {
      throw new Error('Produto não encontrado');
    }
  
    const currentProduct = {
      id: doc.id,
      ...doc.data()
    } as Category;
  
    const updatedProduct: Category = {
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
}