import { UserRole } from '../entities/User';

export interface CreateUserDTO {
  uid:   string;
  nome:  string;
  email: string;
  role?: UserRole;
}