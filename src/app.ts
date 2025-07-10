
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mainRouter from './app/routes';
import globalErrorHandler from './app/middlewares/GlobalErrorHandler';

const app: Application = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// Root welcome route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the PH HealthCare API!',
  });
});

// Health check route with new versioning
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

// Use the main router for all versioned API paths
app.use('/api/v1', mainRouter);

// error handling throgh NextFunction
app.use(globalErrorHandler);

// not found route
// app.use(notFound);


export default app;