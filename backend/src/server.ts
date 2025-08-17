import express from 'express';
import healthRouter from './routes/health';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use('/health', healthRouter);

app.use(errorHandler);

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
