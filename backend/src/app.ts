import express, { Application } from 'express';
// Wait, express-cors is wrong, it should be import cors from 'cors';
import corsMiddleware from 'cors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

const app: Application = express();

app.use(morgan('dev'));
app.use(corsMiddleware());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

export default app;
