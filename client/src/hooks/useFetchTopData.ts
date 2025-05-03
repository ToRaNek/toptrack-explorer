import { useState, useEffect } from 'react';
import api from '../utils/api';
import { TopData } from '../types';

interface FetchTopDataOptions {
    timeRange?: 'short_term' | 'medium_term' | 'long_term';
    enabled?: boolean;
}

export const useFetchTopData = (options: FetchTopDataOptions = {}) => {
    const [data, setData] = useState<TopData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState<number>(0);

    const {
        timeRange = 'medium_term',
        enabled = true
    } = options;

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('/api/data/top-data', {
                params: { time_range: timeRange }
            });

            setData(response.data);
            setRetryCount(0);
        } catch (err: any) {
            console.error('Error fetching top data:', err);

            // Gestion des erreurs 429 (rate limit)
            if (err.response?.status === 429) {
                const retryAfter = parseInt(err.response.headers['retry-after'] || '1', 10);
                setError(`Limite de débit dépassée. Réessai automatique dans ${retryAfter} secondes...`);

                // Back-off exponentiel
                const backOffTime = Math.min(
                    30, // Maximum 30 secondes
                    retryAfter * Math.pow(2, retryCount)
                );

                // Planification d'un réessai
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, backOffTime * 1000);
            } else {
                setError(err.response?.data?.message || 'Erreur lors de la récupération des données');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (enabled) {
            fetchData();
        }
    }, [timeRange, enabled, retryCount]);

    return { data, isLoading, error, refetch: fetchData };
};