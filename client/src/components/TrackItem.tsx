import React from 'react';
import { SpotifyTrack } from '../types';
import Player from './Player';

interface TrackItemProps {
    track: SpotifyTrack;
    index: number;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, index }) => {
    // Sélection de l'image de meilleure qualité
    const albumImage = track.album.images.sort((a, b) => b.width - a.width)[0];

    return (
        <div
            className="flex items-center p-4 mb-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
            <div className="flex items-center justify-center w-8 mr-4 text-gray-400">
                <span className="font-bold">{index + 1}</span>
            </div>

            <div className="flex-shrink-0 mr-4">
                <img
                    src={albumImage.url}
                    alt={`${track.album.name} cover`}
                    className="w-16 h-16 rounded shadow"
                    loading="lazy"
                />
            </div>

            <div className="flex-grow mr-4">
                <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:underline"
                >
                    {track.name}
                </a>
                <p className="text-gray-400">
                    {track.artists.map(artist => artist.name).join(', ')}
                </p>
            </div>

            <div className="flex items-center">
                <Player url={track.preview_url} trackName={track.name} />
            </div>
        </div>
    );
};

export default TrackItem;