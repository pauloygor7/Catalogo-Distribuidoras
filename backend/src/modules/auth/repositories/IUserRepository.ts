import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/createdUser.dto';
import { UpdateUserDTO } from '../dtos/updatedUser.dto';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByUid(uid: string): Promise<User | null>;
  update(uid: string, data: UpdateUserDTO): Promise<void>;
}