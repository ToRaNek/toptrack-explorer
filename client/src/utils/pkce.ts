// Fonctions utilitaires pour PKCE (utilisé côté client pour le login)
export const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(values)
        .map(x => possible[x % possible.length])
        .join('');
};