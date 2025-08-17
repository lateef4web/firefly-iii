
import { Router } from 'express';
import health from './health';

const router = Router();

router.use(health);

export default router;
