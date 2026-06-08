import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.middleware';

const authRoutes = Router();
const controller = new AuthController();

authRoutes.post('/sincronizar', ensureAuthenticated, (req, res) => controller.sync(req, res));
authRoutes.get('/perfil',    ensureAuthenticated, (req, res) => controller.me(req, res));

export { authRoutes };