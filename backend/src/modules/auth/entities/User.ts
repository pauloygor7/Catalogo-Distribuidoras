export type UserRole = 'ADMIN' | 'GERENTE' | 'VENDEDOR';

export interface User {
  uid:        string;
  nome:       string;
  email:      string;
  role:       UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}