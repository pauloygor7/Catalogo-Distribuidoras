import { Request, Response, NextFunction } from "express";
import { auth } from '@shared/infra/firebase/firebase.config';
import { AppError } from '@shared/errors/AppError';

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string; email?: string };
    }
  }
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Token não informado', 401);
    }

    try {
        const decoded = await auth.verifyIdToken(authHeader.split(' ')[1]);
        req.user = { uid: decoded.uid, email: decoded.email };
        next();
    } catch {
        throw new AppError('Token inválido ou expirado', 401); 
    }
}