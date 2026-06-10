import { db } from '@shared/infra/firebase/firebase.config';
import { IInventoryRepository } from './IInventoryRepository';
import { InventoryMoviment } from '../entities/InventoryMoviment';
import { CreateMovementDTO } from '../dtos/createMoviment.dto';

export class FirebaseInventoryRepository implements IInventoryRepository {
    private col = db.collection('inventory_moviments');
    private productsCol = db.collection('products');

    async registerMovement(data: CreateMovementDTO): Promise<InventoryMoviment> {
        const productRef = this.productsCol.doc(data.produtoId);
        
        await db.runTransaction(async (tx) => {
            const productDoc = await tx.get(productRef);
            if (!productDoc.exists) throw new Error('Produto não encontrado.');

            const estoqueAtual = (productDoc.data()?.estoque as number) || 0;

            const novoEstoque = data.tipo === 'ENTRADA' 
                ? estoqueAtual + data.quantidade 
                : estoqueAtual - data.quantidade

            if (novoEstoque < 0) throw new Error('Estoque insuficiente para saída.');
            tx.update(productRef, { estoque: novoEstoque, updatedAt: new Date() });
        });

        const ref = await this.col.add({ ...data, createdAt: new Date() });
        return { id: ref.id, ...data };
    }

    async listMovements(): Promise<InventoryMoviment[]> {
        const snap = await this.col.orderBy('createdAt', 'desc').get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as InventoryMoviment));
    }

    async listMovementsByProduct(produtoId: string): Promise<InventoryMoviment[]> {
        const snap = await this.col.where('produtoId', '==', produtoId).orderBy('createdAt', 'desc').get();
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as InventoryMoviment));
    }
}