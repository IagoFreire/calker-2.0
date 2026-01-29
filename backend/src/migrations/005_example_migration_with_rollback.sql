-- Migration: Exemplo de migration com rollback
-- Este é um exemplo de como criar uma migration com suporte a rollback

-- UP
-- CREATE TABLE exemplo (
--   id SERIAL PRIMARY KEY,
--   nome VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- DOWN
-- DROP TABLE IF EXISTS exemplo;
