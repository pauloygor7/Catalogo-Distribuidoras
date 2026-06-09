import { Request, Response } from 'express';
import { FirebaseCategoryRepository } from '../repositories/firebaseCategory.repository';
import { CreateCategoryUseCase } from '../useCases/createCategory.useCase';
import { ListCategoriesUseCase } from '../useCases/listCategories.useCase';
import { DeleteCategoryUseCase } from '../useCases/deleteCategory.useCase';
import { GetCategoryByIdUseCase } from '../useCases/getCategoryById.useCase';
import { UpdateCategoryUseCase } from '../useCases/updateCategory.useCase';

const repo = new FirebaseCategoryRepository();

export class CategoryController {
  async create(req: Request, res: Response) {
    const data = await new CreateCategoryUseCase(repo).execute(req.body);
    return res.status(201).json({ success: true, data });
  }

  async list(req: Request, res: Response) {
    const data = await new ListCategoriesUseCase(repo).execute();
    return res.json({ data });
  }

  async getById(req: Request, res: Response) {
    const data = await new GetCategoryByIdUseCase(repo).execute(req.params.id as string);
    return res.json({ data });
  }
  
  async update(req: Request, res: Response) {
    const data = await new UpdateCategoryUseCase(repo).execute(req.params.id as string, req.body);
    return res.json({ success: true, message: 'Categoria atualizada com sucesso.', data });
  }

  async delete(req: Request, res: Response) {
    await new DeleteCategoryUseCase(repo).execute(req.params.id as string);
    return res.json({ success: true, message: 'Categoria removida.' }); 
  }
}