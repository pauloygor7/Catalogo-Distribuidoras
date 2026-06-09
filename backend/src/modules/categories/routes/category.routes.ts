import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { ensureAuthenticated } from '@modules/auth/middlewares/ensureAuthenticated.middleware';
import { authorize } from '@modules/auth/middlewares/authorize.middleware';

const categoryRoutes = Router();
const controller     = new CategoryController();

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.post('/',      authorize(['ADMIN', 'GERENTE']), (req, res) => controller.create(req, res));
categoryRoutes.get('/',       (req, res) => controller.list(req, res));
categoryRoutes.get('/:id',    (req, res) => controller.getById(req, res));
categoryRoutes.put('/:id',    (req, res) => controller.update(req, res));
categoryRoutes.delete('/:id', authorize(['ADMIN']),            (req, res) => controller.delete(req, res));

export { categoryRoutes };