import { Router, Response } from 'express';
import { authenticate, requireSuperAdmin, AuthRequest } from '../middleware/auth';
import { createStore, listStores, createUser } from '../utils/db-helpers';
import { hashPassword } from '../utils/password';

const router = Router();

// Criar nova loja (apenas Super Admin)
router.post('/', authenticate, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar loja usando conexão direta ao PostgreSQL
    const store = await createStore(name);

    // Criar usuário admin da loja usando conexão direta ao PostgreSQL
    await createUser({
      email,
      passwordHash,
      role: 'store_admin',
      storeId: store.id,
    });

    res.status(201).json({ store, message: 'Loja criada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar loja' });
  }
});

// Listar todas as lojas (apenas Super Admin)
router.get('/', authenticate, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const stores = await listStores();
    res.json({ stores });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao listar lojas: ' + error.message });
  }
});

export default router;
