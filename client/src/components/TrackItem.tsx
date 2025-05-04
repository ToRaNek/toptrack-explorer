import React from 'react';
import { SpotifyTrack } from '../types';
import Player from './Player';
import { useLanguage } from '../contexts/LanguageContext';

interface TrackItemProps {
    track: SpotifyTrack;
    index: number;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, index }) => {
    const { t } = useLanguage();

    // Sélection de l'image de meilleure qualité
    const albumImage = track.album.images.sort((a, b) => b.width - a.width)[0];

    return (
        <div
            className="flex items-center p-4 mb-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
            <div className="flex items-center justify-center w-8 mr-4 text-gray-400">
                <span className="font-bold">{index + 1}</span>
            </div>

            <div className="flex-shrink-0 mr-4 relative">
                <img
                    src={albumImage.url}
                    alt={`${track.album.name} cover`}
                    className="w-16 h-16 rounded shadow"
                    loading="lazy"
                />

                {/* Badge pour "Liké" */}
                {track.isLiked && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex-grow mr-4">
                <div className="flex items-center">
                    <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold hover:underline"
                    >
                        {track.name}
                    </a>

                    {/* Badge pour "Écouté récemment" */}
                    {track.isRecentlyPlayed && (
                        <span className="ml-2 px-2 py-1 bg-blue-500 text-xs text-white rounded-full">
                            {t('badge.recent')}
                        </span>
                    )}
                </div>
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