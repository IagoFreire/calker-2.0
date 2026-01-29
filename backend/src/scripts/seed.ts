import { pool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    console.log('🌱 Iniciando seed...\n');

    // Verificar se já existe uma loja padrão
    const checkResult = await pool.query(
      `SELECT id, name FROM stores WHERE name = $1 LIMIT 1`,
      ['Loja Padrão']
    );

    if (checkResult.rows.length > 0) {
      console.log('✅ Loja padrão já existe:', checkResult.rows[0]);
      await pool.end();
      return;
    }

    // Criar loja padrão
    const result = await pool.query(
      `INSERT INTO stores (name) 
       VALUES ($1) 
       RETURNING id, name, created_at, updated_at`,
      ['Loja Padrão']
    );

    console.log('✅ Loja padrão criada com sucesso:');
    console.log('   ID:', result.rows[0].id);
    console.log('   Nome:', result.rows[0].name);
    console.log('');

    await pool.end();
    console.log('✅ Seed concluído!\n');
  } catch (error: any) {
    console.error('❌ Erro ao executar seed:', error);
    await pool.end();
    process.exit(1);
  }
}

seed();
