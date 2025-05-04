import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'fr' | 'en';
type TranslationMap = Record<string, string>;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, TranslationMap> = {
    fr: {
        // Commun
        'app.title': 'TopTrack Explorer',
        'app.logout': 'Déconnexion',
        'app.poweredBy': 'Propulsé par Spotify',
        'dashboard.listeningProfile': 'Votre profil d\'écoute',
        'dashboard.period': 'Periode :',
        'dashboard.shortTerm': 'Les 4 denières semaines',
        'dashboard.mediumTerm': 'Les 6 derniers mois',
        'dashboard.longTerm': 'Tout le temps',
        'dashboard.topTracks': 'Vos 10 titres préférés',
        'dashboard.topArtists': 'Vos 5 artistes préférés',
        'dashboard.noTracks': 'Aucun titre trouvé',
        'dashboard.noArtists': 'Aucun artiste trouvé',
        'badge.recent': 'Récemment joué'
    },
    en: {
        // Common
        'app.title': 'TopTrack Explorer',
        'app.logout': 'Logout',
        'app.poweredBy': 'Powered by Spotify',
        'dashboard.listeningProfile': 'Your Listening Profile',
        'dashboard.period': 'Period:',
        'dashboard.shortTerm': 'Last 4 weeks',
        'dashboard.mediumTerm': 'Last 6 months',
        'dashboard.longTerm': 'All time',
        'dashboard.topTracks': 'Your 10 Favorite Tracks',
        'dashboard.topArtists': 'Your 5 Favorite Artists',
        'dashboard.noTracks': 'No tracks found',
        'dashboard.noArtists': 'No artists found',
        'badge.recent': 'Recently Played'
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const getBrowserLanguage = (): Language => {
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'en' ? 'en' : 'fr';
    };

    const getInitialLanguage = (): Language => {
        const storedLang = localStorage.getItem('language') as Language;
        return storedLang || getBrowserLanguage();
    };

    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
