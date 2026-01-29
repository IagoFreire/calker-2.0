import { Router, Response } from 'express';
import { authenticate, requireSuperAdmin, requireStoreAdmin, AuthRequest } from '../middleware/auth';
import { createStore, listStores, updateStore, deleteStore, getStoreById, createUser } from '../utils/db-helpers';
import { hashPassword } from '../utils/password';

const router = Router();

// Criar nova loja (apenas Super Admin)
router.post('/', authenticate, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, admin_name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar loja usando conexão direta ao PostgreSQL
    const store = await createStore(name);

    // Criar usuário admin da loja usando conexão direta ao PostgreSQL
    await createUser({
      name: admin_name,
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

// Buscar loja por ID (Super Admin ou Store Admin da própria loja)
router.get('/:id', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const storeId = req.user?.storeId;
    
    // Store Admin só pode ver sua própria loja
    if (req.user?.role !== 'super_admin' && id !== storeId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    const store = await getStoreById(id);
    
    if (!store) {
      return res.status(404).json({ error: 'Loja não encontrada' });
    }
    
    res.json({ store });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar loja: ' + error.message });
  }
});

// Atualizar loja (apenas Super Admin)
router.put('/:id', authenticate, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const store = await updateStore(id, name);
    res.json({ store, message: 'Loja atualizada com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar loja: ' + error.message });
  }
});

// Deletar loja (apenas Super Admin)
router.delete('/:id', authenticate, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await deleteStore(id);
    res.json({ message: 'Loja deletada com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar loja: ' + error.message });
  }
});

export default router;
