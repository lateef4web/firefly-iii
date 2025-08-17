import { Router } from 'express';
import {
  listExchangeRates,
  showExchangeRate,
  storeExchangeRate,
  updateExchangeRate,
  deleteExchangeRate,
} from '../controllers';

const router = Router();

router.get('/', listExchangeRates);
router.get('/:id', showExchangeRate);
router.post('/', storeExchangeRate);
router.put('/:id', updateExchangeRate);
router.delete('/:id', deleteExchangeRate);

export default router;
