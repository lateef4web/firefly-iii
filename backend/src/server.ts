import express from 'express';

const app = express();

const port = Number(process.env.PORT) || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
