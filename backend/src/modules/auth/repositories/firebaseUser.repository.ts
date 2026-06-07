import { db } from '@shared/infra/firebase/firebase.config';
import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { CreateUserDTO } from '../dtos/createdUser.dto';
import { UpdateUserDTO } from '../dtos/updatedUser.dto';

export class FirebaseUserRepository implements IUserRepository {
    private col = db.collection('users');

    async create(data: CreateUserDTO): Promise<User> {
        const user: User ={
             uid: data.uid,
            nome: data.nome,
            email: data.email,
            role: data.role ?? 'VENDEDOR',
            createdAt: new Date(),
        };
        await this.col.doc(data.uid).set(user);
        return user;
    }

    async findByUid(uid: string): Promise<User | null> {
        const doc = await this.col.doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data() as User;
    }

    async update(uid: string, data: UpdateUserDTO): Promise<void> {
    await this.col.doc(uid).update(data as Record<string, any>);
  }

}