import axios from 'axios';
import { getToken, isTokenExpired, storeToken, clearAuthData } from './storage';

// Création de l'instance axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    withCredentials: true
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(async (config) => {
    const token = getToken();

    // Si nous avons un token et qu'il n'est pas expiré
    if (token && !isTokenExpired()) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Si le token est expiré, essayer de le rafraîchir
    else if (token && isTokenExpired()) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
                {},
                { withCredentials: true }
            );

            const { access_token, expires_in } = response.data;
            storeToken(access_token, expires_in);
            config.headers.Authorization = `Bearer ${access_token}`;
        } catch (error) {
            // En cas d'échec, forcer la déconnexion
            clearAuthData();
            window.location.href = '/login';
        }
    }

    return config;
});

// Intercepteur pour gérer les erreurs 429 (rate limit)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si c'est une erreur 429 et que nous n'avons pas déjà réessayé
        if (error.response?.status === 429 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Récupération du header Retry-After
            const retryAfter = error.response.headers['retry-after'] || 1;

            // Attente avant de réessayer
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));

            // Nouvelle tentative
            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;