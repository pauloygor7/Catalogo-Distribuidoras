import { IUserRepository } from '../repositories/IUserRepository';
import { CreateUserDTO } from '../dtos/createdUser.dto';

export class SyncUserUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const existing = await this.repo.findByUid(data.uid);
    if (existing) return existing;
    return this.repo.create(data);
  }
}