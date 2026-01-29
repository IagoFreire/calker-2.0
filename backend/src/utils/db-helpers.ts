import { query } from '../config/database';

// Helper para buscar usuário por ID
export const getUserById = async (userId: string) => {
  const result = await query(
    `SELECT id, email, role, store_id, created_at, updated_at 
     FROM users 
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0];
};

// Helper para buscar usuário por email
export const getUserByEmail = async (email: string) => {
  const result = await query(
    `SELECT id, email, role, store_id, password_hash, created_at, updated_at 
     FROM users 
     WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Helper para buscar usuário por email com senha (para login)
export const getUserByEmailWithPassword = async (email: string) => {
  const result = await query(
    `SELECT id, email, role, store_id, password_hash, created_at, updated_at 
     FROM users 
     WHERE email = $1 AND password_hash IS NOT NULL`,
    [email]
  );
  return result.rows[0];
};

// Helper para buscar loja por ID
export const getStoreById = async (storeId: string) => {
  const result = await query(
    `SELECT id, name, created_at, updated_at 
     FROM stores 
     WHERE id = $1`,
    [storeId]
  );
  return result.rows[0];
};

// Helper para criar usuário
export const createUser = async (userData: {
  id?: string;
  email: string;
  passwordHash: string;
  role: string;
  storeId?: string | null;
}) => {
  // Gerar UUID se não fornecido
  const userId = userData.id || randomUUID();
  
  const result = await query(
    `INSERT INTO users (id, email, password_hash, role, store_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, email, role, store_id, created_at, updated_at`,
    [userId, userData.email, userData.passwordHash, userData.role, userData.storeId || null]
  );
  return result.rows[0];
};

// Helper para criar loja
export const createStore = async (name: string) => {
  const result = await query(
    `INSERT INTO stores (name) 
     VALUES ($1) 
     RETURNING id, name, created_at, updated_at`,
    [name]
  );
  return result.rows[0];
};

// Helper para listar lojas
export const listStores = async () => {
  const result = await query(
    `SELECT id, name, created_at, updated_at 
     FROM stores 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

// Helper para listar usuários de uma loja
export const listUsersByStore = async (storeId: string) => {
  const result = await query(
    `SELECT u.id, u.email, u.role, u.store_id, u.created_at, u.updated_at, s.name as store_name
     FROM users u
     LEFT JOIN stores s ON u.store_id = s.id
     WHERE u.store_id = $1
     ORDER BY u.created_at DESC`,
    [storeId]
  );
  return result.rows;
};

// Helper para listar todos os usuários (apenas para Super Admin)
export const listAllUsers = async () => {
  const result = await query(
    `SELECT u.id, u.email, u.role, u.store_id, u.created_at, u.updated_at, s.name as store_name
     FROM users u
     LEFT JOIN stores s ON u.store_id = s.id
     ORDER BY u.created_at DESC`
  );
  return result.rows;
};
