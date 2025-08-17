import express from 'express';
import router from './routes';
import { errorHandler } from './middleware';

const app = express();

app.use(router);

app.use(errorHandler);

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
