import { Request, Response } from 'express';
import { FirebaseInventoryRepository } from '../repositories/firebaseInvetory.repository';
import { RegisterMovementUseCase } from '../useCases/registerMoviment.useCase';
import { ListMovimentsUseCase } from '../useCases/listMoviments.useCase';

const repo = new FirebaseInventoryRepository();

export class InventoryController {
  async registerMovement(req: Request, res: Response) {
    const data = await new RegisterMovementUseCase(repo).execute(req.body);
    return res.status(201).json({ success: true, data });
  }

  async listMovements(req: Request, res: Response) {
    const data = await new ListMovimentsUseCase(repo).execute();
    return res.json({ data });
  }
}