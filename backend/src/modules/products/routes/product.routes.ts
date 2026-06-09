import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ensureAuthenticated } from '@modules/auth/middlewares/ensureAuthenticated.middleware';
import { authorize } from '@modules/auth/middlewares/authorize.middleware';

const productRoutes = Router();
const controller    = new ProductController();

productRoutes.use(ensureAuthenticated);

productRoutes.post('/',      (req, res) => controller.create(req, res));
productRoutes.get('/',       (req, res) => controller.list(req, res));
productRoutes.get('/:id',    (req, res) => controller.getById(req, res));
productRoutes.put('/:id',    (req, res) => controller.update(req, res));
productRoutes.delete('/:id', authorize(['ADMIN']), (req, res) => controller.delete(req, res));

export { productRoutes };