# Calker - Sistema de Gestão de Agendamentos

Sistema web completo para gestão de lojas de móveis planejados com arquitetura multi-tenant, focado em agendamentos e gestão de clientes.

## 📖 Sobre o Projeto

O Calker é uma solução completa para gerenciar agendamentos, clientes e operações de lojas de móveis planejados. O sistema oferece uma arquitetura multi-tenant que permite que múltiplas lojas operem de forma isolada e segura.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Ant Design 5** - Componentes UI
- **Styled Components** - Estilização
- **React Router** - Roteamento
- **React Big Calendar** - Calendário de agendamentos
- **Axios** - Cliente HTTP
- **Day.js** - Manipulação de datas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Supabase** - Banco de dados PostgreSQL
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **PostgreSQL** - Banco de dados relacional

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- Conta no **Supabase** (gratuita)
- Git (opcional)

## 🛠️ Instalação

Para uma configuração detalhada passo a passo, consulte o arquivo [SETUP.md](./SETUP.md).

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Calker
```

### 2. Instale as dependências

```bash
npm run install:all
```

Este comando instala as dependências do workspace raiz, frontend e backend.

### 3. Configure o Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Acesse **Settings > API** e copie:
   - Project URL
   - `anon` `public` key
   - `service_role` key (⚠️ Mantenha em segredo!)

### 4. Execute as Migrações

O projeto possui um sistema de migrações automatizado. Execute:

```bash
cd backend
npm run migrate
```

Para verificar o status das migrações:
```bash
npm run migrate:status
```

As migrações criam automaticamente:
- Tabela de lojas (`stores`)
- Tabela de usuários (`users`)
- Tabela de agendamentos (`appointments`)
- Políticas RLS (Row Level Security)
- Triggers e índices

### 5. Configure as Variáveis de Ambiente

#### Backend (`backend/.env`)

Crie o arquivo `backend/.env`:

```env
PORT=5000
SUPABASE_DB_URL=postgresql://postgres.xxx:senha@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
JWT_SECRET=uma_chave_secreta_aleatoria_aqui
```

**Importante**: 
- `SUPABASE_DB_URL`: URL de conexão direta com o banco de dados PostgreSQL do Supabase
- Você pode encontrar essa URL em Settings > Database > Connection string (URI format) no Supabase

### 6. Criar Usuário Super Admin

Após executar as migrações, crie seu primeiro usuário:

```bash
cd backend
npm run create-super-admin
```

Ou siga o guia manual em [SETUP.md](./SETUP.md).

## 🏃 Executando o Projeto

### Desenvolvimento

Para executar frontend e backend simultaneamente:

```bash
npm run dev
```

Isso iniciará:
- **Frontend**: http://localhost:3000 (configurado no vite.config.ts)
- **Backend**: http://localhost:5000

### Executar Separadamente

```bash
# Frontend apenas
npm run dev:frontend

# Backend apenas
npm run dev:backend
```

### Produção

```bash
# Build do frontend
cd frontend
npm run build

# Build do backend
cd backend
npm run build

# Iniciar backend em produção
cd backend
npm start
```

## 📁 Estrutura do Projeto

```
Calker/
├── frontend/                    # Aplicação React + Vite
│   ├── public/                  # Arquivos estáticos
│   │   └── favicon.ico          # Ícone do site
│   ├── src/
│   │   ├── components/          # Componentes React reutilizáveis
│   │   │   ├── common/          # Componentes comuns
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── FormInput.tsx
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   └── index.ts     # Exports centralizados
│   │   │   └── Layout/          # Componentes de layout
│   │   │       ├── Layout.tsx
│   │   │       └── Layout.styled.tsx
│   │   ├── contexts/            # Contextos React
│   │   │   └── AuthContext.tsx   # Contexto de autenticação
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Home/            # Página inicial
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Home.styled.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Dashboard/       # Dashboard com estatísticas
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Dashboard.styled.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Agenda/          # Calendário de agendamentos
│   │   │   │   ├── Agenda.tsx
│   │   │   │   ├── Agenda.styled.tsx
│   │   │   │   └── index.ts
│   │   │   └── Login/           # Página de login
│   │   │       ├── Login.tsx
│   │   │       ├── Login.styled.tsx
│   │   │       └── index.ts
│   │   ├── services/            # Serviços de API
│   │   │   └── appointments.ts  # Serviço de agendamentos
│   │   ├── config/              # Configurações
│   │   │   └── axios.ts         # Configuração do Axios
│   │   ├── styles/              # Temas e estilos globais
│   │   │   ├── theme.ts         # Tema do styled-components
│   │   │   └── styled.d.ts      # Tipos TypeScript
│   │   ├── App.tsx              # Componente raiz
│   │   └── main.tsx             # Entry point
│   ├── index.html               # HTML principal
│   ├── vite.config.ts           # Configuração do Vite
│   └── package.json
│
├── backend/                     # API Node.js + Express
│   ├── src/
│   │   ├── routes/              # Rotas da API
│   │   │   ├── auth.ts          # Autenticação
│   │   │   ├── stores.ts        # Gestão de lojas
│   │   │   ├── users.ts         # Gestão de usuários
│   │   │   └── appointments.ts  # Gestão de agendamentos
│   │   ├── middleware/          # Middlewares
│   │   │   └── auth.ts          # Middleware de autenticação
│   │   ├── migrations/          # Migrações do banco
│   │   ├── config/              # Configurações
│   │   │   └── database.ts      # Configuração do banco
│   │   ├── utils/               # Utilitários
│   │   │   ├── jwt.ts           # Funções JWT
│   │   │   ├── password.ts      # Hash de senhas
│   │   │   └── db-helpers.ts    # Helpers do banco
│   │   ├── scripts/             # Scripts utilitários
│   │   └── index.ts             # Entry point
│   └── package.json
│
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Workspace root
├── README.md                     # Este arquivo
└── SETUP.md                      # Guia de configuração detalhado
```

## 🔐 Sistema de Permissões

O sistema possui três níveis de permissão:

- **Super Admin**: 
  - Acesso total ao sistema
  - Pode criar e gerenciar lojas
  - Pode criar usuários para qualquer loja
  - Pode visualizar todos os agendamentos

- **Store Admin**: 
  - Gerencia apenas sua loja
  - Pode criar usuários para sua loja
  - Pode gerenciar agendamentos da sua loja

- **User**: 
  - Usuário comum da loja
  - Pode visualizar e criar agendamentos da sua loja
  - Acesso limitado às funcionalidades administrativas

## 📝 Funcionalidades

### ✅ Implementadas

- **Autenticação e Autorização**
  - Login com JWT
  - Proteção de rotas
  - Contexto de autenticação global

- **Multi-tenancy**
  - Separação completa por lojas
  - Row Level Security (RLS) no banco
  - Isolamento de dados por loja

- **Gestão de Lojas**
  - CRUD completo de lojas (Super Admin)
  - Listagem e visualização

- **Gestão de Usuários**
  - Criação de usuários por loja
  - Atribuição de roles
  - Listagem de usuários

- **Sistema de Agendamentos**
  - Calendário interativo (React Big Calendar)
  - Criar, editar e deletar agendamentos
  - Visualização mensal, semanal e diária
  - Informações do cliente (nome, email, telefone)
  - Status de agendamento (agendado, confirmado, concluído, cancelado)
  - Filtros por loja
  - Interface drag-and-drop para reorganização

- **Interface**
  - Design moderno com Ant Design
  - Layout responsivo e mobile-first
  - Menu lateral com navegação
  - Dashboard com estatísticas e gráficos
  - Página Home com visão geral
  - Estrutura padronizada de páginas (PageName.tsx + PageName.styled.tsx + index.ts)
  - Componentes reutilizáveis organizados

### 🚧 Em Desenvolvimento

- Relatórios e análises avançadas
- Exportação de dados
- Notificações de agendamentos
- Integração com calendários externos
- Sistema de lembretes

## 🗄️ Banco de Dados

O sistema utiliza **PostgreSQL** através do Supabase com as seguintes tabelas principais:

- **stores**: Lojas do sistema
- **users**: Usuários com roles e associação a lojas
- **appointments**: Agendamentos com informações de clientes

Todas as tabelas possuem:
- Row Level Security (RLS) habilitado
- Políticas de acesso baseadas em roles
- Triggers para `updated_at` automático
- Índices para performance

## 🔧 Scripts Disponíveis

### Workspace Root

```bash
npm run dev              # Inicia frontend e backend em desenvolvimento
npm run dev:frontend     # Inicia apenas o frontend
npm run dev:backend      # Inicia apenas o backend
npm run install:all      # Instala todas as dependências
```

### Backend

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build            # Compila TypeScript
npm start                # Inicia em produção
npm run migrate          # Executa migrações pendentes
npm run migrate:status   # Verifica status das migrações
npm run create-super-admin  # Cria usuário super admin
npm run seed             # Popula banco com dados de exemplo
```

### Frontend

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build para produção
npm run preview          # Preview do build de produção
```

## 🧪 Migrações

O projeto possui um sistema de migrações automatizado localizado em `backend/src/migrations/`.

### Executar Migrações

```bash
cd backend
npm run migrate          # Executa todas as migrações pendentes
npm run migrate:status  # Verifica status das migrações
```

### Criar Nova Migração

Para criar uma nova migração, use o script:

```bash
cd backend
npm run create-migration -- nome-da-migracao
```

Isso criará um arquivo SQL numerado sequencialmente em `backend/src/migrations/`.

### Estrutura das Migrações

Cada migração deve seguir o padrão:
- Nome do arquivo: `NNN_nome_da_migracao.sql`
- Números sequenciais (000, 001, 002, ...)
- Suporte a rollback (quando aplicável)

As migrações são executadas em ordem sequencial e possuem suporte a rollback.

## 📐 Convenções de Código

### Estrutura de Páginas

Todas as páginas seguem o padrão padronizado:

```
PageName/
├── PageName.tsx          # Componente principal
├── PageName.styled.tsx   # Estilos styled-components
└── index.ts              # Export: export { default } from './PageName'
```

### Imports

Use imports simplificados através dos arquivos `index.ts`:

```typescript
// ✅ Correto
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// ❌ Evitar
import Home from './pages/Home/Home';
```

### Componentes

- Componentes reutilizáveis em `components/common/`
- Exports centralizados via `index.ts`
- Styled-components para estilização
- TypeScript para tipagem

### Nomenclatura

- Componentes: PascalCase (`Home.tsx`, `Dashboard.tsx`)
- Arquivos de estilo: `ComponentName.styled.tsx`
- Hooks: camelCase com prefixo `use` (`useAuth`)
- Constantes: UPPER_SNAKE_CASE

## 📚 Documentação Adicional

- [SETUP.md](./SETUP.md) - Guia detalhado de configuração
- [backend/src/migrations/README.md](./backend/src/migrations/README.md) - Documentação das migrações

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso interno.

## 🆘 Suporte

Para problemas ou dúvidas:
1. Consulte o arquivo [SETUP.md](./SETUP.md) para problemas comuns
2. Verifique os logs do backend e frontend
3. Verifique as variáveis de ambiente
4. Verifique se as migrações foram executadas corretamente

---

Desenvolvido com ❤️ para gestão eficiente de agendamentos
