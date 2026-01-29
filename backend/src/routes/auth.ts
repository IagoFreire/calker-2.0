import { Router, Request, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getUserById, getUserByEmailWithPassword } from '../utils/db-helpers';
import { query } from '../config/database';
import { generateToken } from '../utils/jwt';
import { comparePassword } from '../utils/password';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário por email com senha
    const userData = await getUserByEmailWithPassword(email);

    if (!userData) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(password, userData.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Buscar nome da loja se houver
    let storeName = null;
    if (userData.store_id) {
      const storeResult = await query(
        'SELECT name FROM stores WHERE id = $1',
        [userData.store_id]
      );
      storeName = storeResult.rows[0]?.name || null;
    }

    // Gerar token JWT
    const token = generateToken({
      userId: userData.id,
      email: userData.email,
      role: userData.role,
      storeId: userData.store_id || undefined,
    });

    res.json({
      user: {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        store_id: userData.store_id,
        stores: storeName ? { name: storeName } : null,
      },
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Logout (com JWT, logout é apenas do lado do cliente removendo o token)
router.post('/logout', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    // Com JWT, o logout é feito removendo o token do cliente
    // Aqui apenas confirmamos que o logout foi solicitado
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

// Verificar usuário atual
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userData = await getUserById(req.user!.id);
    
    // Buscar nome da loja se houver
    let storeName = null;
    if (userData.store_id) {
      const storeResult = await query(
        'SELECT name FROM stores WHERE id = $1',
        [userData.store_id]
      );
      storeName = storeResult.rows[0]?.name || null;
    }

    res.json({
      user: {
        ...userData,
        stores: storeName ? { name: storeName } : null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

export default router;
