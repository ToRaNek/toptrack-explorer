import { Request, Response } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

interface AuthenticatedRequest extends Request {
    spotifyToken?: string;
}

// Récupère à la fois les top tracks et top artists
export const getTopData = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const token = req.spotifyToken;

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Token d\'accès manquant'
            });
        }

        // Initialisation du client Spotify avec le token
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        // Récupération du time_range du query params (facultatif)
        // Dans getTopData function, modifiez les lignes 29-30 ainsi:
        const timeRange = req.query.time_range as string;
        const validTimeRange = (timeRange === 'short_term' || timeRange === 'long_term' || timeRange === 'medium_term')
            ? (timeRange as 'short_term' | 'medium_term' | 'long_term')
            : 'medium_term';

// Puis utilisez validTimeRange dans les appels API
        const [topTracksResponse, topArtistsResponse] = await Promise.all([
            spotifyApi.getMyTopTracks({ limit: 10, time_range: validTimeRange }),
            spotifyApi.getMyTopArtists({ limit: 5, time_range: validTimeRange })
        ]);

        res.json({
            topTracks: topTracksResponse.body.items,
            topArtists: topArtistsResponse.body.items
        });

    } catch (error: any) {
        console.error('Error fetching top data:', error);

        // Gestion spécifique de l'erreur 429 (rate limit)
        if (error.statusCode === 429) {
            const retryAfter = error.headers?.['retry-after'] || 1;

            res.status(429).json({
                status: 'error',
                message: 'Rate limit dépassé',
                retryAfter: parseInt(retryAfter, 10)
            });
        } else {
            res.status(error.statusCode || 500).json({
                status: 'error',
                message: error.message || 'Erreur lors de la récupération des données'
            });
        }
    }
};

// Récupère les informations de l'utilisateur
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const token = req.spotifyToken;

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Token d\'accès manquant'
            });
        }

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        const response = await spotifyApi.getMe();

        res.json(response.body);

    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Erreur lors de la récupération du profil'
        });
    }
};