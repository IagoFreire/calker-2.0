import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import * as readlineSync from 'readline-sync';

dotenv.config();

const connectionString = process.env.SUPABASE_DB_URL || '';

if (!connectionString) {
  console.error('[ERRO] SUPABASE_DB_URL deve estar configurado no .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const query = async (text: string, params?: any[]) => {
  return await pool.query(text, params);
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Função para ler input do terminal
function askQuestion(query: string): string {
  return readlineSync.question(query);
}

// Função para ler senha sem mostrar no terminal
function askPassword(query: string): string {
  return readlineSync.question(query, {
    hideEchoBack: true, // Esconde os caracteres digitados
  });
}

async function createSuperAdmin() {
  console.log('=== Criar Super Admin - Calker ===\n');

  // Se os argumentos foram fornecidos via linha de comando, usar eles
  let email = process.argv[2];
  let password = process.argv[3];

  // Se não foram fornecidos, perguntar interativamente
  if (!email) {
    email = askQuestion('Email: ');
  }

  if (!password) {
    password = askPassword('Senha: ');
    
    // Confirmar senha apenas se foi digitada interativamente
    const confirmPassword = askPassword('Confirmar senha: ');
    if (password !== confirmPassword) {
      console.error('\n[ERRO] As senhas nao coincidem');
      process.exit(1);
    }
  }

  if (!email || !password) {
    console.error('\n[ERRO] Email e senha sao obrigatorios');
    process.exit(1);
  }

  try {
    // Verificar se já existe usuário com esse email
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.error('[ERRO] Usuario com este email ja existe');
      process.exit(1);
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Criar usuário Super Admin
    const userId = randomUUID();
    const result = await query(
      `INSERT INTO users (id, email, password_hash, role, store_id) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, role`,
      [userId, email, passwordHash, 'super_admin', null]
    );

    console.log('\n[SUCESSO] Super Admin criado com sucesso!');
    console.log(`   ID: ${result.rows[0].id}`);
    console.log(`   Email: ${result.rows[0].email}`);
    console.log(`   Role: ${result.rows[0].role}\n`);
  } catch (error: any) {
    console.error('[ERRO] Erro ao criar Super Admin:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

createSuperAdmin();
