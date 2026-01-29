import { Router, Response } from 'express';
import { authenticate, requireStoreAdmin, AuthRequest } from '../middleware/auth';
import { createUser, listUsersByStore, listAllUsers, updateUser, deleteUser, getUserById } from '../utils/db-helpers';
import { hashPassword } from '../utils/password';

const router = Router();

// Criar usuário da loja (Store Admin ou Super Admin)
router.post('/', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const storeId = req.user?.storeId;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Super Admin pode criar em qualquer loja ou sem loja, Store Admin apenas na sua
    let targetStoreId: string | null = null;
    if (req.user?.role === 'super_admin') {
      targetStoreId = req.body.store_id || null;
      // Super admin pode criar sem loja apenas se o role for super_admin
      if (!targetStoreId && role !== 'super_admin') {
        return res.status(400).json({ error: 'Loja é obrigatória para usuários que não são Super Admin' });
      }
    } else {
      // Store Admin precisa ter loja
      if (!storeId) {
        return res.status(400).json({ error: 'Loja não encontrada' });
      }
      targetStoreId = storeId;
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário na tabela users usando conexão direta ao PostgreSQL
    const user = await createUser({
      name,
      email,
      passwordHash,
      role,
      storeId: targetStoreId,
    });

    res.status(201).json({ user, message: 'Usuário criado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário: ' + (error.message || 'Erro desconhecido') });
  }
});

// Listar usuários da loja
router.get('/', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const storeId = req.user?.storeId;
    const { store_id } = req.query; // Permitir filtrar por loja específica

    if (req.user?.role === 'super_admin') {
      // Super Admin vê todos os usuários ou pode filtrar por loja
      if (store_id) {
        const users = await listUsersByStore(store_id as string);
        return res.json({ users });
      }
      const users = await listAllUsers();
      return res.json({ users });
    }

    // Store Admin vê apenas usuários da sua loja
    if (!storeId) {
      return res.status(400).json({ error: 'Loja não encontrada' });
    }

    const users = await listUsersByStore(storeId);
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao listar usuários: ' + error.message });
  }
});

// Buscar usuário por ID
router.get('/:id', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const storeId = req.user?.storeId;

    const user = await getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar permissões: usuário pode sempre ver a si mesmo, Super Admin pode ver qualquer usuário, Store Admin apenas da sua loja
    const isViewingSelf = req.user?.id === id;
    if (!isViewingSelf && req.user?.role !== 'super_admin' && user.store_id !== storeId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
  }
});

// Atualizar usuário
router.put('/:id', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, store_id } = req.body;
    const storeId = req.user?.storeId;

    // Verificar se o usuário existe e se tem permissão
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar permissões: usuário pode sempre editar a si mesmo
    const isEditingSelf = req.user?.id === id;
    if (!isEditingSelf && req.user?.role !== 'super_admin' && existingUser.store_id !== storeId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    // Preparar dados para atualização
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    
    // Se estiver editando a si mesmo, não permitir alterar role ou store_id
    if (isEditingSelf) {
      if (role !== undefined && role !== existingUser.role) {
        return res.status(400).json({ error: 'Você não pode alterar seu próprio perfil' });
      }
      if (store_id !== undefined && store_id !== existingUser.store_id) {
        return res.status(400).json({ error: 'Você não pode alterar sua própria loja' });
      }
    } else {
      // Apenas admins podem alterar role e store_id de outros usuários
      if (role !== undefined) {
        // Validar role
        if (!['super_admin', 'store_admin', 'user'].includes(role)) {
          return res.status(400).json({ error: 'Role inválido' });
        }
        updateData.role = role;
      }
      // Super Admin pode alterar a loja do usuário, Store Admin não
      if (req.user?.role === 'super_admin' && store_id !== undefined) {
        updateData.storeId = store_id;
      }
    }
    
    if (password) {
      updateData.passwordHash = await hashPassword(password);
    }

    const user = await updateUser(id, updateData);
    res.json({ user, message: 'Usuário atualizado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
  }
});

// Deletar usuário
router.delete('/:id', authenticate, requireStoreAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const storeId = req.user?.storeId;

    // Verificar se o usuário existe e se tem permissão
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar permissões
    if (req.user?.role !== 'super_admin' && existingUser.store_id !== storeId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    // Não permitir deletar a si mesmo
    if (existingUser.id === req.user?.id) {
      return res.status(400).json({ error: 'Não é possível deletar seu próprio usuário' });
    }

    await deleteUser(id);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar usuário: ' + error.message });
  }
});

export default router;
