import { Request, Response } from 'express';
import { FirebaseUserRepository } from '../repositories/firebaseUser.repository';
import { SyncUserUseCase }        from '../useCases/syncUser.useCase';
import { GetMeUseCase }           from '../useCases/getMe.useCase';

export class AuthController {

  private syncUseCase:  SyncUserUseCase;
  private getMeUseCase: GetMeUseCase;

  constructor(private repo = new FirebaseUserRepository()) {
    this.syncUseCase  = new SyncUserUseCase(repo);
    this.getMeUseCase = new GetMeUseCase(repo);
  }

  async sync(req: Request, res: Response) {
    try {
      const { uid, email } = req.user!;
      const { nome, role } = req.body;

      const user = await this.syncUseCase.execute({
        uid,
        email: email ?? '',
        nome:  nome  ?? email ?? 'Usuário',
        role,
      });

      return res.status(201).json({ success: true, data: user });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const user = await this.getMeUseCase.execute(req.user!.uid);
      return res.json({ data: user });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}