import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Dashboard from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import { Notification } from './types';

const App: React.FC = () => {
    const [auth, login, logout] = useAuth();
    const [notification, setNotification] = useState<Notification | null>(null);

    const showNotification = (notification: Notification) => {
        setNotification(notification);
    };

    const clearNotification = () => {
        setNotification(null);
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <Login
                        isAuthenticated={auth.isAuthenticated}
                        isLoading={auth.isLoading}
                        onLogin={login}
                        onLogout={logout}
                        notification={notification}
                        onNotificationClose={clearNotification}
                    />
                }
            />
            <Route
                path="/callback"
                element={
                    <Callback
                        onNotificationClose={clearNotification}
                        onLogout={logout}
                    />
                }
            />
            <Route
                path="/"
                element={
                    <Dashboard
                        isAuthenticated={auth.isAuthenticated}
                        isLoading={auth.isLoading}
                        onLogout={logout}
                        notification={notification}
                        onNotificationClose={clearNotification}
                    />
                }
            />
        </Routes>
    );
};

export default App;