
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares globales de seguridad y lectura de JSON
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json());

// 2. Ruta de verificación de salud (Health Check)
import userRouter from './routes/user.router';

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor backend en ejecución',
    timestamp: new Date(),
  });
});


// 3. Middleware de manejo centralizado de errores
app.use('/api/users', userRouter);

app.use(errorHandler);

// 4. Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});