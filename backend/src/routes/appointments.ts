import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { pool } from '../config/database';

const router = Router();

// Listar agendamentos da loja
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const storeId = req.user?.storeId;
    const userRole = req.user?.role;
    const requestedStoreId = req.query.store_id as string | undefined;

    // Super admin pode especificar uma loja ou ver todas
    // Outros usuários usam sua própria loja
    let targetStoreId: string | undefined;

    if (userRole === 'super_admin') {
      // Super admin pode especificar uma loja ou ver todas
      targetStoreId = requestedStoreId || storeId;
    } else {
      // Outros usuários só podem ver agendamentos da sua loja
      targetStoreId = storeId;
    }

    // Se não for super_admin e não tiver storeId, retorna lista vazia
    if (!targetStoreId && userRole !== 'super_admin') {
      return res.json({ appointments: [] });
    }

    let query: string;
    let params: any[];

    if (userRole === 'super_admin' && !targetStoreId) {
      // Super admin sem loja específica vê todos os agendamentos
      query = `
        SELECT 
          a.*,
          u.email as created_by_email
        FROM appointments a
        LEFT JOIN users u ON a.created_by = u.id
        ORDER BY a.start_time ASC
      `;
      params = [];
    } else {
      // Usuário normal ou super admin com loja específica
      query = `
        SELECT 
          a.*,
          u.email as created_by_email
        FROM appointments a
        LEFT JOIN users u ON a.created_by = u.id
        WHERE a.store_id = $1
        ORDER BY a.start_time ASC
      `;
      params = [targetStoreId];
    }

    const result = await pool.query(query, params);
    res.json({ appointments: result.rows });
  } catch (error: any) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
});

// Criar agendamento
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      start_time,
      end_time,
      client_name,
      client_email,
      client_phone,
      status = 'scheduled',
      store_id,
    } = req.body;

    const userStoreId = req.user?.storeId;
    const userRole = req.user?.role;
    const createdBy = req.user?.id;

    if (!createdBy) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Super admin pode especificar uma loja, outros usam sua própria loja
    let targetStoreId: string | undefined;
    if (userRole === 'super_admin') {
      targetStoreId = store_id || userStoreId;
      // Se super admin não tem loja e não especificou, busca a primeira loja disponível
      if (!targetStoreId) {
        try {
          const storesResult = await pool.query(
            `SELECT id, name, created_at, updated_at 
             FROM stores 
             ORDER BY created_at DESC
             LIMIT 1`
          );
          console.log('Lojas encontradas:', storesResult.rows);
          if (storesResult.rows && storesResult.rows.length > 0) {
            targetStoreId = storesResult.rows[0].id;
            console.log('Usando loja:', targetStoreId);
          } else {
            console.log('Nenhuma loja encontrada no banco');
            return res.status(400).json({ 
              error: 'Nenhuma loja encontrada no sistema. Crie uma loja primeiro.' 
            });
          }
        } catch (error: any) {
          console.error('Erro ao buscar lojas:', error);
          return res.status(500).json({ 
            error: 'Erro ao buscar lojas: ' + error.message 
          });
        }
      }
    } else {
      targetStoreId = userStoreId;
      // Usuários normais devem ter uma loja associada
      if (!targetStoreId) {
        return res.status(400).json({ 
          error: 'Loja não encontrada. O usuário deve ter uma loja associada para criar agendamentos.' 
        });
      }
    }

    if (!title || !start_time || !end_time) {
      return res.status(400).json({ error: 'Título, data de início e fim são obrigatórios' });
    }

    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ error: 'Data de início deve ser anterior à data de fim' });
    }

    const query = `
      INSERT INTO appointments (
        store_id, title, description, start_time, end_time,
        client_name, client_email, client_phone, status, created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const result = await pool.query(query, [
      targetStoreId,
      title,
      description || null,
      start_time,
      end_time,
      client_name || null,
      client_email || null,
      client_phone || null,
      status,
      createdBy,
    ]);

    res.status(201).json({ appointment: result.rows[0], message: 'Agendamento criado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
});

// Atualizar agendamento
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      start_time,
      end_time,
      client_name,
      client_email,
      client_phone,
      status,
    } = req.body;

    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(400).json({ error: 'Loja não encontrada' });
    }

    // Verificar se o agendamento pertence à loja do usuário
    const checkQuery = 'SELECT id FROM appointments WHERE id = $1 AND store_id = $2';
    const checkResult = await pool.query(checkQuery, [id, storeId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({ error: 'Data de início deve ser anterior à data de fim' });
    }

    const updateFields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (title !== undefined) {
      updateFields.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (start_time !== undefined) {
      updateFields.push(`start_time = $${paramCount++}`);
      values.push(start_time);
    }
    if (end_time !== undefined) {
      updateFields.push(`end_time = $${paramCount++}`);
      values.push(end_time);
    }
    if (client_name !== undefined) {
      updateFields.push(`client_name = $${paramCount++}`);
      values.push(client_name);
    }
    if (client_email !== undefined) {
      updateFields.push(`client_email = $${paramCount++}`);
      values.push(client_email);
    }
    if (client_phone !== undefined) {
      updateFields.push(`client_phone = $${paramCount++}`);
      values.push(client_phone);
    }
    if (status !== undefined) {
      updateFields.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    values.push(id, storeId);

    const query = `
      UPDATE appointments
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount++} AND store_id = $${paramCount++}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    res.json({ appointment: result.rows[0], message: 'Agendamento atualizado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento' });
  }
});

// Deletar agendamento
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(400).json({ error: 'Loja não encontrada' });
    }

    const query = 'DELETE FROM appointments WHERE id = $1 AND store_id = $2 RETURNING id';
    const result = await pool.query(query, [id, storeId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro ao deletar agendamento' });
  }
});

// Obter agendamento por ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(400).json({ error: 'Loja não encontrada' });
    }

    const query = `
      SELECT 
        a.*,
        u.email as created_by_email
      FROM appointments a
      LEFT JOIN users u ON a.created_by = u.id
      WHERE a.id = $1 AND a.store_id = $2
    `;

    const result = await pool.query(query, [id, storeId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ appointment: result.rows[0] });
  } catch (error: any) {
    console.error('Erro ao obter agendamento:', error);
    res.status(500).json({ error: 'Erro ao obter agendamento' });
  }
});

export default router;
