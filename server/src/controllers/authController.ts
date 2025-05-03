import { Request, Response } from 'express';
import spotifyApi from '../utils/spotifyClient';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';
import config from '../config';

// Génère et stocke le code verifier pour la session
export const login = (req: Request, res: Response) => {
    try {
        // Génération du code verifier et challenge pour PKCE
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);

        // Stockage dans un cookie sécurisé (HTTPOnly)
        res.cookie('code_verifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 10 * 60 * 1000 // 10 minutes
        });

        // Création de l'URL d'autorisation avec le state anti-CSRF
        const state = 'state';
        const showDialog = true;

        // Création de l'URL d'autorisation Spotify en suivant la signature correcte
        const authorizeURL = spotifyApi.createAuthorizeURL(
            config.spotify.scopes,
            state
        );

        // Ajout des paramètres PKCE manuellement car l'API ne les supporte pas directement
        const finalAuthorizeURL = `${authorizeURL}&show_dialog=${showDialog}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

        res.redirect(finalAuthorizeURL);
    } catch (error) {
        console.error('Login error:', error);
        res.redirect(`${config.clientUrl}/error?message=Échec de l'authentification`);
    }
};

// Traite le callback de Spotify et récupère les tokens
export const callback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query;
        const codeVerifier = req.cookies.code_verifier;

        if (!code || !codeVerifier) {
            return res.redirect(`${config.clientUrl}/error?message=Paramètres d'authentification manquants`);
        }

        // Au lieu d'utiliser la méthode authorizationCodeGrant de l'API Spotify,
        // effectuons directement la requête HTTP avec le code_verifier
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                    config.spotify.clientId + ':' + config.spotify.clientSecret
                ).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: config.spotify.redirectUri,
                code_verifier: codeVerifier
            })
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            console.error('Token error:', errorData);
            return res.redirect(`${config.clientUrl}/error?message=Échec de l'authentification: ${errorData.error}`);
        }

        const tokenData = await tokenResponse.json();

        // Nettoyage du cookie code_verifier
        res.clearCookie('code_verifier');

        // Stockage du refresh_token dans un cookie sécurisé
        res.cookie('refresh_token', tokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 jours
        });

        // Configuration du token pour l'API Spotify
        spotifyApi.setAccessToken(tokenData.access_token);
        spotifyApi.setRefreshToken(tokenData.refresh_token);

        // Redirection vers le frontend avec l'access_token
        res.redirect(
            `${config.clientUrl}/callback?access_token=${tokenData.access_token}&expires_in=${tokenData.expires_in}`
        );
    } catch (error) {
        console.error('Callback error:', error);
        res.redirect(`${config.clientUrl}/error?message=Échec lors de la récupération des tokens`);
    }
};

// Rafraîchit l'access token
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({
                status: 'error',
                message: 'Refresh token manquant'
            });
        }

        spotifyApi.setRefreshToken(refreshToken);
        const data = await spotifyApi.refreshAccessToken();

        res.json({
            access_token: data.body.access_token,
            expires_in: data.body.expires_in
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({
            status: 'error',
            message: 'Échec du rafraîchissement du token'
        });
    }
};

// Déconnexion
export const logout = (req: Request, res: Response) => {
    res.clearCookie('refresh_token');
    res.json({ status: 'success', message: 'Déconnecté avec succès' });
};