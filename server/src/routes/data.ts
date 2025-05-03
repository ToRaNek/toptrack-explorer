import { Router } from 'express';
import { getTopData, getUserProfile } from '../controllers/dataController';
import { validateToken } from '../middleware/validateToken';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

// Routes de données protégées par token
router.use(validateToken);
router.use(apiLimiter);

router.get('/top-data', getTopData);
router.get('/profile', getUserProfile);

export default router;