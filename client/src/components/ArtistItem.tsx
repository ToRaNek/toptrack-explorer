import React from 'react';
import { SpotifyArtist } from '../types';

interface ArtistItemProps {
    artist: SpotifyArtist;
    index: number;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artist, index }) => {
    // Sélection de l'image de meilleure qualité
    const artistImage = artist.images.sort((a, b) => b.width - a.width)[0]?.url || '/spotify-logo.svg';

    return (
        <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
        >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 transition-opacity group-hover:opacity-80"></div>

                <img
                    src={artistImage}
                    alt={`${artist.name}`}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold mb-2">
            #{index + 1}
          </span>
                    <h3 className="text-white text-xl font-bold">{artist.name}</h3>
                </div>
            </div>
        </a>
    );
};

export default ArtistItem;