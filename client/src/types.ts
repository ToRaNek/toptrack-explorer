// Interfaces des objets Spotify
export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    images: SpotifyImage[];
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyTrack {
    id: string;
    name: string;
    preview_url: string | null;
    external_urls: {
        spotify: string;
    };
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    isLiked?: boolean;
    isRecentlyPlayed?: boolean;
}

export interface TopData {
    topTracks: SpotifyTrack[];
    topArtists: SpotifyArtist[];
}

// États d'authentification
export interface AuthState {
    accessToken: string | null;
    expiresAt: number | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// État des notifications
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}