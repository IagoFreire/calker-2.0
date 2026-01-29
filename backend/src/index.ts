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
