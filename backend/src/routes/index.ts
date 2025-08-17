import { Application, Router } from 'express';
import healthRouter from './health';

/**
 * Mount all application routes under /api/v1.
 *
 * @param app Express application instance
 */
export default function mountRoutes(app: Application): void {
  const apiRouter = Router();

  // register sub-routers
  apiRouter.use('/health', healthRouter);

  app.use('/api/v1', apiRouter);
}

