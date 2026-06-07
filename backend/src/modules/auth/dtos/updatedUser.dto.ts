import { UserRole } from '../entities/User';

export interface UpdateUserDTO {
  nome?: string;
  role?: UserRole;
}