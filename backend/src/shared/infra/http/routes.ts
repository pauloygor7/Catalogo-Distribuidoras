import { Router } from 'express';
import { authRoutes }      from '@modules/auth/routes/auth.routes';
import { productRoutes } from '@modules/products/routes/product.routes';
import { categoryRoutes } from '@modules/categories/routes/category.routes';
import { inventoryRoutes } from '@modules/inventory/routes/inventory.routes';
import { uploadRoutes } from '@modules/uploads/routes/upload.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/produto', productRoutes);
routes.use('/categoria', categoryRoutes);
routes.use('/estoque', inventoryRoutes);
routes.use('/upload',     uploadRoutes);

export { routes };