import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/User';
import { FirebaseUserRepository } from '../repositories/firebaseUser.repository';
import { AppError } from '@shared/errors/AppError';

const repo = new FirebaseUserRepository();

export function authorize(roles: UserRole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await repo.findByUid(req.user!.uid);

    if (!user || !roles.includes(user.role)) {  
      throw new AppError('Acesso não autorizado.', 403);
    }

    next();
  };
}