# Guia de Configuração - Calker

Este guia irá te ajudar a configurar o sistema Calker do zero.

## 📋 Passo a Passo

### 1. Instalar Dependências

```bash
npm run install:all
```

### 2. Configurar Supabase

1. Acesse seu projeto no Supabase
2. Vá em **Settings > API**
3. Copie os seguintes valores:
   - **URL**: `Project URL`
   - **anon key**: `anon` `public` key
   - **service_role key**: `service_role` key (⚠️ Mantenha em segredo!)

### 3. Executar Migrações do Banco de Dados

O projeto possui um sistema de migrações automatizado. Execute:

```bash
cd backend
npm run migrate
```

Isso criará automaticamente todas as tabelas, políticas RLS, triggers e índices necessários.

Para verificar o status das migrações:
```bash
npm run migrate:status
```

**Nota**: As migrações são executadas em ordem sequencial e possuem suporte a rollback.

### 4. Criar Usuário Super Admin

#### Opção A: Via Interface do Supabase (Recomendado)

1. No Supabase, vá em **Authentication > Users**
2. Clique em **Add User**
3. Preencha:
   - **Email**: seu email
   - **Password**: sua senha
   - **Auto Confirm User**: ✅ (marcar)
4. Clique em **Create User**
5. Copie o **User UID** que aparece (será necessário no próximo passo)

#### Opção B: Via SQL (Alternativo)

```sql
-- Criar usuário diretamente (substitua os valores)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'seu_email@exemplo.com',
  crypt('sua_senha', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### 5. Associar Usuário ao Perfil Super Admin

1. No Supabase, vá em **SQL Editor**
2. Execute o seguinte SQL, substituindo:
   - `ID_DO_USUARIO`: O User UID copiado no passo anterior
   - `SEU_EMAIL`: O email usado para criar o usuário

```sql
INSERT INTO users (id, email, role, store_id)
VALUES (
  'ID_DO_USUARIO',
  'SEU_EMAIL',
  'super_admin',
  NULL
);
```

### 6. Configurar Variáveis de Ambiente

#### Backend (`backend/.env`)

Crie o arquivo `backend/.env` com:

```env
PORT=5000
SUPABASE_DB_URL=url_aqui
JWT_SECRET=uma_chave_secreta_aleatoria_aqui
```

### 7. Executar o Projeto

```bash
npm run dev
```

Isso irá iniciar:
- **Frontend**: http://localhost:3000 (configurado no vite.config.ts)
- **Backend**: http://localhost:5000

### 8. Fazer Login

1. Acesse http://localhost:3000
2. Use as credenciais do Super Admin criado anteriormente
3. Você será redirecionado para a página inicial

## ✅ Verificação

Após o login, você deve:
- Ver o menu lateral com as opções: Home, Dashboard, Agenda
- Ver seu email no canto superior direito
- Ver "Super Admin" no dropdown do usuário

## 🆘 Problemas Comuns

### Erro: "Token inválido"
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o usuário foi criado corretamente no Supabase Auth

### Erro: "Service Role Key não configurada"
- Certifique-se de que `SUPABASE_SERVICE_ROLE_KEY` está no `backend/.env`
- A service_role key é diferente da anon key

### Erro: "Usuário não encontrado"
- Verifique se executou o SQL para associar o usuário ao perfil Super Admin
- Verifique se o ID do usuário está correto

### Erro de CORS
- Certifique-se de que o backend está rodando na porta 5000
- Verifique se o proxy está configurado no `vite.config.ts`

## 📝 Próximos Passos

Após configurar o sistema:
1. Crie sua primeira loja (via API ou interface futura)
2. Crie usuários para as lojas
3. Comece a usar o sistema!

## 📚 Estrutura Padronizada

O projeto segue padrões de organização:

### Páginas
Cada página segue a estrutura:
```
PageName/
├── PageName.tsx          # Componente principal
├── PageName.styled.tsx   # Estilos styled-components
└── index.ts              # Export para facilitar imports
```

### Componentes
Componentes reutilizáveis estão em `components/common/` com exports centralizados via `index.ts`.

### Imports
Use imports simplificados:
```typescript
import Home from './pages/Home';        // ✅ Correto
import Home from './pages/Home/Home';    // ❌ Evitar
```
