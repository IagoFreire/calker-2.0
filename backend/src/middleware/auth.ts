import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../utils/db-helpers';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    storeId?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Verificar e decodificar token JWT
    const payload = verifyToken(token);

    // Buscar informações do usuário no banco para garantir que ainda existe
    const userData = await getUserById(payload.userId);

    if (!userData) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar dados do usuário com informações do banco (caso role tenha mudado)
    req.user = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      storeId: userData.store_id || undefined,
    };

    next();
  } catch (error: any) {
    if (error.message === 'Token inválido ou expirado') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(401).json({ error: 'Erro na autenticação' });
  }
};

export const requireSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'super_admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas Super Admin.' });
  }
  next();
};

export const requireStoreAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'super_admin' && req.user?.role !== 'store_admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas Admin.' });
  }
  next();
};
