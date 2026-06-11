import { Router } from 'express';
import { UploadController, upload } from '../controllers/upload.controller';
import { ensureAuthenticated } from '@modules/auth/middlewares/ensureAuthenticated.middleware';

const uploadRoutes = Router();
const controller   = new UploadController();

uploadRoutes.use(ensureAuthenticated);

uploadRoutes.post(
  '/product-image',
  upload.single('image'),
  (req, res) => controller.uploadProductImage(req, res)
);

export { uploadRoutes };