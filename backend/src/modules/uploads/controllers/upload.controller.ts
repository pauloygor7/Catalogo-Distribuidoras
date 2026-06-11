import { Request, Response } from 'express';
import multer from 'multer';
import { storage } from '@shared/infra/firebase/firebase.config';
import { AppError } from '@shared/errors/AppError';

export const upload = multer({ storage: multer.memoryStorage() });

export class UploadController {
  async uploadProductImage(req: Request, res: Response) {
    if (!req.file) throw new AppError('Nenhum arquivo enviado.', 400);

    const bucket   = storage.bucket();
    const fileName = `products/${Date.now()}_${req.file.originalname}`;
    const fileRef  = bucket.file(fileName);

    await fileRef.save(req.file.buffer, { contentType: req.file.mimetype });
    await fileRef.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return res.json({ success: true, url });
  }
}