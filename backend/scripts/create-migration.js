#!/usr/bin/env node

/**
 * Script para criar uma nova migration
 * Uso: node scripts/create-migration.js nome_da_migration
 */

const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Erro: Nome da migration é obrigatório');
  console.log('Uso: node scripts/create-migration.js nome_da_migration');
  process.exit(1);
}

// Validar nome (apenas letras, números e underscore)
if (!/^[a-zA-Z0-9_]+$/.test(migrationName)) {
  console.error('❌ Erro: Nome da migration deve conter apenas letras, números e underscore');
  process.exit(1);
}

const migrationsDir = path.join(__dirname, '../src/migrations');

// Verificar se a pasta existe
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Listar migrations existentes para determinar o próximo número
const existingFiles = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))
  .sort();

// Pegar o último número ou começar em 000
let nextNumber = '000';
if (existingFiles.length > 0) {
  const lastFile = existingFiles[existingFiles.length - 1];
  const match = lastFile.match(/^(\d+)_/);
  if (match) {
    const lastNum = parseInt(match[1], 10);
    nextNumber = String(lastNum + 1).padStart(3, '0');
  }
}

// Criar nome do arquivo
const filename = `${nextNumber}_${migrationName}.sql`;
const filepath = path.join(migrationsDir, filename);

// Template da migration
const template = `-- Migration: ${migrationName}
-- Criado em: ${new Date().toISOString()}

-- UP
-- Adicione aqui o SQL para aplicar a migration


-- DOWN (opcional)
-- Adicione aqui o SQL para reverter a migration
-- DROP TABLE IF EXISTS exemplo;
`;

// Verificar se o arquivo já existe
if (fs.existsSync(filepath)) {
  console.error(`❌ Erro: Migration ${filename} já existe`);
  process.exit(1);
}

// Criar o arquivo
fs.writeFileSync(filepath, template, 'utf-8');

console.log(`✅ Migration criada: ${filename}`);
console.log(`📁 Localização: ${filepath}`);
