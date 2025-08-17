
import { Router } from 'express';
import health from './health';

const router = Router();

router.get('/health', (_req, res) => {
  res.sendStatus(200);
});

export default router;
