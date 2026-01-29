-- Migration: Adicionar campo name na tabela users

-- UP
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Atualizar registros existentes para usar email como nome temporário
UPDATE users SET name = email WHERE name IS NULL;

-- DOWN
ALTER TABLE users DROP COLUMN IF EXISTS name;
