import { Router, Response } from 'express';
import { authenticate, requireStoreAdmin, AuthRequest } from '../middleware/auth';
import { createUser, listUsersByStore, listAllUsers } from '../utils/db-helpers';
import { hashPassword } from '../utils/password';

const router = Router();

// Criar usuário da loja (Store Admin ou Super Admin)
router.post('/', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, role = 'user' } = req.body;
    const storeId = req.user?.storeId;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Super Admin pode criar em qualquer loja, Store Admin apenas na sua
    const targetStoreId = req.user?.role === 'super_admin' ? req.body.store_id : storeId;

    if (!targetStoreId) {
      return res.status(400).json({ error: 'Loja não especificada' });
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário na tabela users usando conexão direta ao PostgreSQL
    const user = await createUser({
      email,
      passwordHash,
      role,
      storeId: targetStoreId,
    });

    res.status(201).json({ user, message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Listar usuários da loja
router.get('/', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const storeId = req.user?.storeId;

    if (req.user?.role === 'super_admin') {
      // Super Admin vê todos os usuários usando conexão direta ao PostgreSQL
      const users = await listAllUsers();
      return res.json({ users });
    }

    // Store Admin vê apenas usuários da sua loja usando conexão direta ao PostgreSQL
    if (!storeId) {
      return res.status(400).json({ error: 'Loja não encontrada' });
    }

    const users = await listUsersByStore(storeId);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

export default router;
