import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import NotificationBar from './NotificationBar';
import LanguageSelector from './LanguageSelector';
import { Notification } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
    children: ReactNode;
    notification: Notification | null;
    onNotificationClose: () => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({
                                           children,
                                           notification,
                                           onNotificationClose,
                                           isAuthenticated,
                                           onLogout
                                       }) => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NotificationBar
                notification={notification}
                onClose={onNotificationClose}
            />

            <header className="bg-black shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-green-500 flex items-center">
                        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                        {t('app.title')}
                    </Link>

                    <div className="flex items-center">
                        <LanguageSelector />

                        {isAuthenticated && (
                            <button
                                onClick={onLogout}
                                className="ml-4 px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                {t('app.logout')}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="bg-black py-4 mt-8">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>{t('app.poweredBy')}</p>
                    <a
                        href="https://developer.spotify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2"
                    >
                        <img
                            src="/spotify-logo.svg"
                            alt="Spotify Logo"
                            className="h-8"
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Layout;