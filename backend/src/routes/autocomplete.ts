import { Router } from 'express';
import * as controller from '../controllers/autocomplete';

const router = Router();

router.get('/accounts', controller.accounts);
router.get('/bills', controller.bills);
router.get('/budgets', controller.budgets);
router.get('/categories', controller.categories);
router.get('/currencies', controller.currencies);
router.get('/object-groups', controller.objectGroups);
router.get('/piggy-banks', controller.piggyBanks);
router.get('/recurrences', controller.recurrences);
router.get('/rules', controller.rules);
router.get('/rule-groups', controller.ruleGroups);
router.get('/tags', controller.tags);
router.get('/transactions', controller.transactions);
router.get('/transaction-types', controller.transactionTypes);

export default router;
