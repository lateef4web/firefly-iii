import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

export default function applyMiddleware(app: express.Express) {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );
  app.use(compression());
}
