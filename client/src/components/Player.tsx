import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PlayerProps {
    url: string | null;
    trackName: string;
}

const Player: React.FC<PlayerProps> = ({ url, trackName }) => {
    const { t } = useLanguage();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Réinitialisation à chaque changement d'URL
        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [url]);

    const togglePlay = () => {
        if (!url || !audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error('Playback error:', error);
            });
        }

        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    if (!url) {
        return (
            <button
                disabled
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                title={t('player.unavailable')}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        );
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={url}
                onEnded={handleEnded}
                preload="none"
                aria-label={`Aperçu de ${trackName}`}
            />

            <button
                onClick={togglePlay}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                title={isPlaying ? t('player.pause') : t('player.play')}
            >
                {isPlaying ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                )}
            </button>
        </>
    );
};

export default Player;