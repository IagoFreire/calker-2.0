# Sistema de Migrations

Sistema de migrations para gerenciar o schema do banco de dados PostgreSQL.

## 📋 Estrutura

As migrations são arquivos SQL numerados sequencialmente na pasta `src/migrations/`:

```
migrations/
├── 000_create_migrations_table.sql
├── 001_create_stores_table.sql
├── 002_create_users_table.sql
├── 003_create_rls_policies.sql
├── 004_create_triggers.sql
└── migrate.ts (script de execução)
```

## 🚀 Comandos

### Executar migrations pendentes
```bash
npm run migrate:up
# ou
npm run migrate up
```

### Reverter última migration
```bash
npm run migrate:down
# ou
npm run migrate down
```

### Ver status das migrations
```bash
npm run migrate:status
# ou
npm run migrate status
```

## 📝 Criar Nova Migration

### Método 1: Manual
Crie um arquivo SQL na pasta `src/migrations/` com o padrão:
```
XXX_nome_da_migration.sql
```

Onde `XXX` é um número sequencial (ex: `005`, `006`, etc.)

### Método 2: Usando script (recomendado)
```bash
npm run migrate:create nome_da_migration
```

Isso criará um arquivo numerado automaticamente com template básico.

**Exemplo:**
```bash
npm run migrate:create adicionar_campo_telefone
```

Isso criará: `005_adicionar_campo_telefone.sql`

## 📄 Formato das Migrations

### Formato Simples (apenas UP)
```sql
-- Migration: nome da migration

CREATE TABLE exemplo (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255)
);
```

### Formato com Rollback (UP e DOWN)
```sql
-- Migration: nome da migration

-- UP
CREATE TABLE exemplo (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255)
);

-- DOWN
DROP TABLE IF EXISTS exemplo;
```

## ⚠️ Importante

1. **Nunca modifique migrations já executadas** - Crie uma nova migration para alterações
2. **Use transações** - O sistema já executa cada migration em uma transação
3. **Teste antes** - Sempre teste suas migrations em desenvolvimento primeiro
4. **Ordem importa** - As migrations são executadas em ordem alfabética/numerada

## 🔍 Como Funciona

1. O sistema mantém uma tabela `migrations` no banco de dados
2. Cada migration executada é registrada nesta tabela
3. Ao executar `migrate:up`, apenas migrations não executadas são rodadas
4. O sistema garante que cada migration seja executada apenas uma vez

## 📊 Exemplo de Uso

```bash
# Ver quais migrations estão pendentes
npm run migrate:status

# Executar todas as migrations pendentes
npm run migrate:up

# Se algo der errado, reverter a última
npm run migrate:down

# Verificar novamente o status
npm run migrate:status
```
