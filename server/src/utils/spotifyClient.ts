import SpotifyWebApi from 'spotify-web-api-node';
import config from '../config';

// Création du client Spotify
const spotifyApi = new SpotifyWebApi({
    clientId: config.spotify.clientId,
    clientSecret: config.spotify.clientSecret,
    redirectUri: config.spotify.redirectUri
});

// Fonction pour rafraîchir le token
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    try {
        spotifyApi.setRefreshToken(refreshToken);
        const data = await spotifyApi.refreshAccessToken();
        return data.body.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

export default spotifyApi;