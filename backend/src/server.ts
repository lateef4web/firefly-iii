import express from 'express';
import mountRoutes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();

mountRoutes(app);

app.use(errorHandler);

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
