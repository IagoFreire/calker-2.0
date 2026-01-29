-- Migration: Criar políticas RLS (Row Level Security)

-- Habilitar RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver (para permitir re-execução)
DROP POLICY IF EXISTS "Super admins podem ver todas as lojas" ON stores;
DROP POLICY IF EXISTS "Super admins podem criar lojas" ON stores;
DROP POLICY IF EXISTS "Store admins podem ver sua loja" ON stores;
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON users;
DROP POLICY IF EXISTS "Admins podem ver usuários da sua loja" ON users;
DROP POLICY IF EXISTS "Admins podem criar usuários" ON users;

-- Políticas RLS para stores
CREATE POLICY "Super admins podem ver todas as lojas"
  ON stores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Super admins podem criar lojas"
  ON stores FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Store admins podem ver sua loja"
  ON stores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.store_id = stores.id
      AND users.role IN ('store_admin', 'user')
    )
  );

-- Políticas RLS para users
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver usuários da sua loja"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND (u.role = 'store_admin' OR u.role = 'super_admin')
      AND (u.store_id = users.store_id OR u.role = 'super_admin')
    )
  );

CREATE POLICY "Admins podem criar usuários"
  ON users FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND (u.role = 'store_admin' OR u.role = 'super_admin')
    )
  );
