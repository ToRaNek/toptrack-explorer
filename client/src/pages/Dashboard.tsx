import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFetchTopData } from '../hooks/useFetchTopData';
import Layout from '../components/Layout';
import TrackItem from '../components/TrackItem';
import ArtistItem from '../components/ArtistItem';

interface DashboardProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    onLogout: () => void;
    notification: any;
    onNotificationClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
                                                 isAuthenticated,
                                                 isLoading: authLoading,
                                                 onLogout,
                                                 notification,
                                                 onNotificationClose
                                             }) => {
    const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');

    const {
        data,
        isLoading: dataLoading,
        error,
        refetch
    } = useFetchTopData({
        timeRange,
        enabled: isAuthenticated
    });

    if (authLoading) {
        return (
            <Layout
                notification={notification}
                onNotificationClose={onNotificationClose}
                isAuthenticated={false}
                onLogout={onLogout}
            >
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const timeRangeLabels = {
        'short_term': 'Les 4 dernières semaines',
        'medium_term': 'Les 6 derniers mois',
        'long_term': 'Tout le temps'
    };

    return (
        <Layout
            notification={
                error
                    ? { id: 'data-error', type: 'error', message: error }
                    : notification
            }
            onNotificationClose={onNotificationClose}
            isAuthenticated={isAuthenticated}
            onLogout={onLogout}
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Votre profil d'écoute</h1>

                <div className="flex flex-wrap items-center mb-4">
                    <span className="mr-4">Période :</span>
                    <div className="flex space-x-2">
                        {Object.entries(timeRangeLabels).map(([value, label]) => (
                            <button
                                key={value}
                                onClick={() => setTimeRange(value as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    timeRange === value
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => refetch()}
                        className="ml-auto p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                        title="Rafraîchir"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {dataLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-6">Vos 10 titres préférés</h2>

                        {data?.topTracks?.length ? (
                            <div>
                                {data.topTracks.map((track, index) => (
                                    <TrackItem
                                        key={track.id}
                                        track={track}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">Aucun titre à afficher.</p>
                        )}
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Vos 5 artistes préférés</h2>

                        {data?.topArtists?.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                                {data.topArtists.map((artist, index) => (
                                    <ArtistItem
                                        key={artist.id}
                                        artist={artist}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">Aucun artiste à afficher.</p>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;