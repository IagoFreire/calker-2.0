import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import storeRoutes from './routes/stores';
import userRoutes from './routes/users';
import appointmentRoutes from './routes/appointments';
import { pool } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS
const allowedOrigins = [
  'https://calker.iagofreire.dev',
  'http://calker.iagofreire.dev',
  'http://localhost:3000',
  'http://localhost:5173', // Vite dev server padrão
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) {
      console.log('🌐 Requisição sem origin (mobile/app) - permitindo');
      return callback(null, true);
    }
    
    // Log para debug
    console.log(`🌐 Origin recebido: ${origin}`);
    
    // Verificar se o origin está na lista
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Origin permitido: ${origin}`);
      callback(null, true);
    } else {
      // Verificar se é um subdomínio ou variação do domínio permitido
      const isAllowedDomain = allowedOrigins.some(allowed => {
        try {
          const allowedUrl = new URL(allowed);
          const originUrl = new URL(origin);
          // Permitir mesmo domínio (com ou sem www, http ou https)
          return allowedUrl.hostname.replace(/^www\./, '') === originUrl.hostname.replace(/^www\./, '');
        } catch {
          return false;
        }
      });
      
      if (isAllowedDomain) {
        console.log(`✅ Origin permitido (domínio correspondente): ${origin}`);
        callback(null, true);
      } else {
        console.warn(`⚠️ Origin bloqueado: ${origin}`);
        console.log(`📋 Origins permitidos: ${allowedOrigins.join(', ')}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calker API está funcionando' });
});

// Testar conexão com o banco antes de iniciar o servidor
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado ao PostgreSQL:', res.rows[0].now);
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  }
});
