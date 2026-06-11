import { Request, Response } from 'express';
import { db } from '@shared/infra/firebase/firebase.config';

export class ReportsController {
  async dashboard(req: Request, res: Response) {
    const [productsSnap, movSnap] = await Promise.all([
      db.collection('products').get(),
      db.collection('inventory_movements').get(),
    ]);

    const products           = productsSnap.docs.map(d => d.data());
    const totalProdutos      = products.length;
    const estoqueBaixo       = products.filter(p => (p.estoque as number) < 5).length;
    const totalMovimentacoes = movSnap.size;

    return res.json({ data: { totalProdutos, estoqueBaixo, totalMovimentacoes } });
  }
}