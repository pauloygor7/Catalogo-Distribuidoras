import { Router } from 'express';
import { authRoutes }      from '@modules/auth/routes/auth.routes';
import { productRoutes } from '@modules/products/routes/product.routes';

const routes = Router();

routes.use('/auth',       authRoutes);
routes.use('/produto',       productRoutes);

export { routes };