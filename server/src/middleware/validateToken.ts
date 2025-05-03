import { Request, Response, NextFunction } from 'express';
import { refreshAccessToken } from '../utils/spotifyClient';

interface AuthenticatedRequest extends Request {
    spotifyToken?: string;
}

export const validateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        const refreshToken = req.cookies.refresh_token;

        if (!accessToken) {
            return res.status(401).json({
                status: 'error',
                message: 'Token d\'accès manquant'
            });
        }

        // Nous stockons le token pour les contrôleurs
        req.spotifyToken = accessToken;
        next();

    } catch (error) {
        next(error);
    }
};