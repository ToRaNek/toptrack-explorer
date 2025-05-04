import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface CallbackProps {
    onNotificationClose: () => void;
    onLogout: () => void;
}

const Callback: React.FC<CallbackProps> = ({
                                               onNotificationClose,
                                               onLogout
                                           }) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        const errorMessage = params.get('error');

        if (errorMessage) {
            setError(errorMessage);
        } else if (!accessToken) {
            setError('Token d\'accès manquant dans la réponse.');
        } else {
            // En cas de succès, la redirection se fera via useAuth
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [navigate]);

    return (
        <Layout
            notification={
                error
                    ? { id: 'callback-error', type: 'error', message: error }
                    : null
            }
            onNotificationClose={onNotificationClose}
            isAuthenticated={false}
            onLogout={onLogout}
        >
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
                <p className="text-lg">
                    {error ? t('callback.failed') : t('callback.authenticating')}
                </p>
            </div>
        </Layout>
    );
};

export default Callback;