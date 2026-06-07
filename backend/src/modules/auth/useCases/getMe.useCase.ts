import { IUserRepository } from '../repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

export class GetMeUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(uid: string) {
    const user = await this.repo.findByUid(uid);
    if (!user) throw new AppError('Usuário não encontrado.', 404);
    return user;
  }
}