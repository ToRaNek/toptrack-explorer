// Gestion sécurisée du stockage local
const TOKEN_KEY = 'spotify_token';
const EXPIRY_KEY = 'spotify_expiry';

// Stockage du token avec expiration
export const storeToken = (token: string, expiresIn: number): void => {
    localStorage.setItem(TOKEN_KEY, token);

    // Calcul de la date d'expiration en millisecondes
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
};

// Récupération du token
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

// Vérification de l'expiration du token
export const isTokenExpired = (): boolean => {
    const expiryTime = localStorage.getItem(EXPIRY_KEY);
    if (!expiryTime) return true;

    return Date.now() > parseInt(expiryTime, 10);
};

// Suppression des données d'authentification
export const clearAuthData = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
};