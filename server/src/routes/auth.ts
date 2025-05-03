import { Router } from 'express';
import { login, callback, refreshToken, logout } from '../controllers/authController';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// Routes d'authentification avec rate limiting
router.get('/login', authLimiter, login);
router.get('/callback', authLimiter, callback);
router.post('/refresh', authLimiter, refreshToken);
router.post('/logout', logout);

export default router;