import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center">
            <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-sm mr-1 rounded ${
                    language === 'fr'
                        ? 'bg-white text-black font-bold'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                aria-label="Français"
                title="Français"
            >
                FR
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-sm rounded ${
                    language === 'en'
                        ? 'bg-white text-black font-bold'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                aria-label="English"
                title="English"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSelector;