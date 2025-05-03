import rateLimit from 'express-rate-limit';

// Limite de base: 100 requêtes par 15 minutes
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite par IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Trop de requêtes, veuillez réessayer plus tard'
    }
});

// Limite stricte pour les endpoints d'authentification
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 10, // limite par IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Trop de tentatives d\'authentification, veuillez réessayer plus tard'
    }
});