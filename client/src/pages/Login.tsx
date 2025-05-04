import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    onLogin: () => void;
    onLogout: () => void;
    notification: any;
    onNotificationClose: () => void;
}

const Login: React.FC<LoginProps> = ({
                                         isAuthenticated,
                                         isLoading,
                                         onLogin,
                                         onLogout,
                                         notification,
                                         onNotificationClose
                                     }) => {
    const { t } = useLanguage();

    if (isLoading) {
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

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout
            notification={notification}
            onNotificationClose={onNotificationClose}
            isAuthenticated={false}
            onLogout={onLogout}
        >
            <div className="max-w-md mx-auto mt-12 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {t('login.welcome')}
                    </h1>

                    <p className="text-gray-300 mb-8 text-center">
                        {t('login.description')}
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={onLogin}
                            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-colors flex items-center"
                        >
                            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            {t('login.button')}
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-700 text-sm text-gray-400">
                    <p className="text-center">
                        {t('login.disclaimer')}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;