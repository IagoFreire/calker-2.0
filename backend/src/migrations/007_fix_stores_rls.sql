-- Migration: Ajustar políticas RLS para stores permitir acesso via pool direto
-- Como estamos usando autenticação JWT customizada e conexão direta via pool,
-- precisamos permitir acesso à tabela stores

-- Remover políticas existentes que dependem de auth.uid()
DROP POLICY IF EXISTS "Super admins podem ver todas as lojas" ON stores;
DROP POLICY IF EXISTS "Super admins podem criar lojas" ON stores;
DROP POLICY IF EXISTS "Store admins podem ver sua loja" ON stores;

-- Desabilitar RLS temporariamente para permitir acesso via pool direto
-- OU criar política permissiva para desenvolvimento
-- Por enquanto, vamos desabilitar RLS na tabela stores já que a autenticação
-- é feita no nível da aplicação via middleware
ALTER TABLE stores DISABLE ROW LEVEL SECURITY;

-- Se preferir manter RLS habilitado, use esta política permissiva:
-- ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Permitir acesso via pool direto"
--   ON stores FOR ALL
--   USING (true)
--   WITH CHECK (true);
