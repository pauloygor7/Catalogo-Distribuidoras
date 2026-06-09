import { Request, Response } from 'express';
import { FirebaseProductRepository } from '../repositories/firebaseProductRepository';
import { CreateProductUseCase }  from '../useCases/createProduct.useCase';
import { ListProductsUseCase }   from '../useCases/listProduct.useCase';
import { GetProductByIdUseCase } from '../useCases/getProductById.useCase';
import { UpdateProductUseCase }  from '../useCases/updateProduct.useCase';
import { DeleteProductUseCase }  from '../useCases/deleteProduct.useCase';

const repo = new FirebaseProductRepository();

export class ProductController {
  async create(req: Request, res: Response) {
    const product = await new CreateProductUseCase(repo).execute(req.body);
    return res.status(201).json({ success: true, data: product });
  }

  async list(req: Request, res: Response) {
    const products = await new ListProductsUseCase(repo).execute();
    return res.json({ data: products });
  }

  async getById(req: Request, res: Response) {
    const product = await new GetProductByIdUseCase(repo).execute(req.params.id as string);
    return res.json({ data: product });
  }

  async update(req: Request, res: Response) {
    const product = await new UpdateProductUseCase(repo).execute(req.params.id as string, req.body);
    return res.json({ success: true, message: 'Produto atualizado com sucesso.', data: product });
  }

  async delete(req: Request, res: Response) {
    await new DeleteProductUseCase(repo).execute(req.params.id as string);
    return res.json({ success: true, message: 'Produto removido com sucesso.' });
  }
}