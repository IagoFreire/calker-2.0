import { Pool, Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.SUPABASE_DB_URL || '';

if (!connectionString) {
  throw new Error('SUPABASE_DB_URL deve estar configurado no .env');
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

interface Migration {
  name: string;
  file: string;
  up: string;
  down?: string;
}

// Ler todas as migrations
function getMigrations(): Migration[] {
  const migrationsDir = path.join(__dirname);
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  return files.map(file => {
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Separar UP e DOWN se houver comentários especiais
    const upMatch = content.match(/-- UP\s*([\s\S]*?)(?=-- DOWN|$)/i);
    const downMatch = content.match(/-- DOWN\s*([\s\S]*)/i);
    
    return {
      name: file.replace('.sql', ''),
      file,
      up: upMatch ? upMatch[1].trim() : content,
      down: downMatch ? downMatch[1].trim() : undefined,
    };
  });
}

// Verificar quais migrations já foram executadas
async function getExecutedMigrations(): Promise<string[]> {
  try {
    const result = await pool.query('SELECT name FROM migrations ORDER BY name');
    return result.rows.map(row => row.name);
  } catch (error: any) {
    // Se a tabela não existe, retornar array vazio
    if (error.code === '42P01') {
      return [];
    }
    throw error;
  }
}

// Executar uma migration
async function runMigration(migration: Migration, direction: 'up' | 'down' = 'up'): Promise<void> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const sql = direction === 'up' ? migration.up : migration.down;
    
    if (!sql) {
      throw new Error(`Migration ${migration.name} não tem script ${direction}`);
    }
    
    // Executar o SQL da migration
    await client.query(sql);
    
    if (direction === 'up') {
      // Registrar a migration como executada
      await client.query(
        'INSERT INTO migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
        [migration.name]
      );
    } else {
      // Remover o registro da migration
      await client.query('DELETE FROM migrations WHERE name = $1', [migration.name]);
    }
    
    await client.query('COMMIT');
    console.log(`✅ Migration ${migration.name} executada (${direction})`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Erro ao executar migration ${migration.name}:`, error);
    throw error;
  } finally {
    client.release();
  }
}

// Executar todas as migrations pendentes
export async function migrateUp(): Promise<void> {
  console.log('🔄 Iniciando migrations...\n');
  
  try {
    const migrations = getMigrations();
    let executed: string[] = [];
    
    // Tentar buscar migrations executadas
    try {
      executed = await getExecutedMigrations();
    } catch (error: any) {
      // Se a tabela não existe, precisamos criar a primeira migration primeiro
      if (error.code === '42P01') {
        console.log('📋 Tabela de migrations não existe. Criando...\n');
        const firstMigration = migrations.find(m => m.name.includes('create_migrations_table'));
        if (firstMigration) {
          // Executar a migration de criação da tabela sem usar runMigration
          // (pois runMigration tenta inserir na tabela que ainda não existe)
          const client = await pool.connect();
          try {
            await client.query('BEGIN');
            await client.query(firstMigration.up);
            // Agora que a tabela existe, podemos registrar
            await client.query(
              'INSERT INTO migrations (name) VALUES ($1)',
              [firstMigration.name]
            );
            await client.query('COMMIT');
            console.log(`✅ Migration ${firstMigration.name} executada (up)\n`);
            executed.push(firstMigration.name);
          } catch (err) {
            await client.query('ROLLBACK');
            throw err;
          } finally {
            client.release();
          }
        } else {
          throw new Error('Migration de criação da tabela migrations não encontrada');
        }
      } else {
        throw error;
      }
    }
    
    const pending = migrations.filter(m => !executed.includes(m.name));
    
    if (pending.length === 0) {
      console.log('✅ Nenhuma migration pendente.\n');
      return;
    }
    
    console.log(`📦 ${pending.length} migration(s) pendente(s):\n`);
    pending.forEach(m => console.log(`  - ${m.name}`));
    console.log('');
    
    for (const migration of pending) {
      await runMigration(migration, 'up');
    }
    
    console.log(`\n✅ Todas as migrations foram executadas com sucesso!\n`);
  } catch (error) {
    console.error('❌ Erro ao executar migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Reverter a última migration
export async function migrateDown(): Promise<void> {
  console.log('🔄 Revertendo última migration...\n');
  
  try {
    const migrations = getMigrations();
    const executed = await getExecutedMigrations();
    
    if (executed.length === 0) {
      console.log('✅ Nenhuma migration para reverter.\n');
      return;
    }
    
    // Encontrar a última migration executada
    const lastExecuted = executed[executed.length - 1];
    const migration = migrations.find(m => m.name === lastExecuted);
    
    if (!migration) {
      throw new Error(`Migration ${lastExecuted} não encontrada`);
    }
    
    if (!migration.down) {
      throw new Error(`Migration ${migration.name} não tem script de rollback`);
    }
    
    await runMigration(migration, 'down');
    console.log(`\n✅ Migration ${migration.name} revertida com sucesso!\n`);
  } catch (error) {
    console.error('❌ Erro ao reverter migration:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Listar status das migrations
export async function migrateStatus(): Promise<void> {
  console.log('📊 Status das migrations:\n');
  
  try {
    const migrations = getMigrations();
    const executed = await getExecutedMigrations();
    
    migrations.forEach(migration => {
      const isExecuted = executed.includes(migration.name);
      const status = isExecuted ? '✅' : '⏳';
      console.log(`${status} ${migration.name}`);
    });
    
    console.log(`\nTotal: ${migrations.length} | Executadas: ${executed.length} | Pendentes: ${migrations.length - executed.length}\n`);
  } catch (error) {
    console.error('❌ Erro ao verificar status:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar comando da linha de comando
const command = process.argv[2];

if (command === 'up') {
  migrateUp();
} else if (command === 'down') {
  migrateDown();
} else if (command === 'status') {
  migrateStatus();
} else {
  console.log('📋 Sistema de Migrations - Calker\n');
  console.log('Uso: npm run migrate [comando]\n');
  console.log('Comandos disponíveis:');
  console.log('  up     - Executar migrations pendentes');
  console.log('  down   - Reverter última migration');
  console.log('  status - Ver status das migrations\n');
  console.log('Exemplos:');
  console.log('  npm run migrate:up     (ou npm run migrate up)');
  console.log('  npm run migrate:down   (ou npm run migrate down)');
  console.log('  npm run migrate:status (ou npm run migrate status)\n');
  process.exit(0); // Sair com sucesso ao mostrar ajuda
}
