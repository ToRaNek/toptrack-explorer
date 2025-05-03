import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken, storeToken, clearAuthData, isTokenExpired } from '../utils/storage';
import { AuthState } from '../types';
import api from '../utils/api';

export const useAuth = (): [AuthState, () => void, () => void] => {
    const navigate = useNavigate();
    const location = useLocation();

    // État initial de l'authentification
    const [auth, setAuth] = useState<AuthState>({
        accessToken: null,
        expiresAt: null,
        isAuthenticated: false,
        isLoading: true
    });

    // Initialisation de l'état d'authentification
    useEffect(() => {
        const initAuth = () => {
            const token = getToken();

            if (token && !isTokenExpired()) {
                setAuth({
                    accessToken: token,
                    expiresAt: parseInt(localStorage.getItem('spotify_expiry') || '0', 10),
                    isAuthenticated: true,
                    isLoading: false
                });
            } else if (token && isTokenExpired()) {
                // Si le token est expiré, essayer de le rafraîchir
                refreshToken();
            } else {
                setAuth({
                    accessToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            }
        };

        // Traitement du callback de Spotify
        const handleCallback = () => {
            const params = new URLSearchParams(location.search);
            const accessToken = params.get('access_token');
            const expiresIn = params.get('expires_in');

            if (accessToken && expiresIn) {
                storeToken(accessToken, parseInt(expiresIn, 10));

                setAuth({
                    accessToken,
                    expiresAt: Date.now() + parseInt(expiresIn, 10) * 1000,
                    isAuthenticated: true,
                    isLoading: false
                });

                navigate('/');
            }
        };

        if (location.pathname === '/callback') {
            handleCallback();
        } else {
            initAuth();
        }
    }, [location, navigate]);

    // Rafraîchissement du token
    const refreshToken = async () => {
        try {
            setAuth(prev => ({ ...prev, isLoading: true }));

            const response = await api.post('/auth/refresh');
            const { access_token, expires_in } = response.data;

            storeToken(access_token, expires_in);

            setAuth({
                accessToken: access_token,
                expiresAt: Date.now() + expires_in * 1000,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
        }
    };

    // Déconnexion
    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuthData();
            setAuth({
                accessToken: null,
                expiresAt: null,
                isAuthenticated: false,
                isLoading: false
            });
            navigate('/login');
        }
    };

    // Fonction de connexion
    const login = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/login`;
    };

    return [auth, login, logout];
};