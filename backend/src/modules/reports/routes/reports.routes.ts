import { Router } from 'express';
import { ReportsController } from '../controllers/reports.controller';
import { ensureAuthenticated } from '@modules/auth/middlewares/ensureAuthenticated.middleware';
import { authorize } from '@modules/auth/middlewares/authorize.middleware';

const reportsRoutes = Router();
const controller    = new ReportsController();

reportsRoutes.use(ensureAuthenticated);

reportsRoutes.get('/dashboard', authorize(['ADMIN', 'GERENTE']), (req, res) => controller.dashboard(req, res));

export { reportsRoutes };