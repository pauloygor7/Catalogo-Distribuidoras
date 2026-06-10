import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { ensureAuthenticated } from '@modules/auth/middlewares/ensureAuthenticated.middleware';

const inventoryRoutes = Router();
const controller      = new InventoryController();

inventoryRoutes.use(ensureAuthenticated);

inventoryRoutes.post('/movimento', (req, res) => controller.registerMovement(req, res));
inventoryRoutes.get('/',  (req, res) => controller.listMovements(req, res));

export { inventoryRoutes };