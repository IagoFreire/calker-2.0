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
const PORT = Number(process.env.PORT) || 5000;

// Configuração do CORS
const corsOptions = {
  origin: [
    'https://calker.iagofreire.dev',
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server padrão
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Calker API está funcionando' });
});

// Middleware de tratamento de erros global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Testar conexão com o banco antes de iniciar o servidor
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('✅ Conectado ao PostgreSQL:', res.rows[0].now);
    
    // Escutar em 0.0.0.0 para aceitar conexões de qualquer interface
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 Acessível em http://0.0.0.0:${PORT} e http://localhost:${PORT}`);
    });
  }
});
