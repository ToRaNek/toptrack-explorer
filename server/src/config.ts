import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 8000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID || '',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
        redirectUri: process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:8000/api/auth/callback',
        scopes: [
            'user-top-read',
            'user-read-private',
            'user-read-email',
            'user-read-recently-played',
            'user-library-read'
        ]
    }
};

export default config;