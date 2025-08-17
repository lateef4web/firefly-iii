import { Router } from 'express';
import healthRouter from './health';
import { auth, throttle, locale } from '../middleware';

const router = Router();

router.use(locale);
router.use(throttle);
router.use(auth);

router.use('/health', healthRouter);

export default router;
