import React, { useState, useEffect } from 'react';
import { Notification } from '../types';

interface NotificationBarProps {
    notification: Notification | null;
    onClose?: () => void;
    autoClose?: boolean;
    duration?: number;
}

const NotificationBar: React.FC<NotificationBarProps> = ({
                                                             notification,
                                                             onClose,
                                                             autoClose = true,
                                                             duration = 5000
                                                         }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (notification) {
            setIsVisible(true);

            if (autoClose) {
                const timer = setTimeout(() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }, duration);

                return () => clearTimeout(timer);
            }
        } else {
            setIsVisible(false);
        }
    }, [notification, autoClose, duration, onClose]);

    if (!notification || !isVisible) return null;

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };

    return (
        <div className={`fixed top-0 left-0 right-0 p-4 ${bgColors[notification.type]} text-white shadow-md z-50 transition-all duration-300`}>
            <div className="container mx-auto flex justify-between items-center">
                <div>{notification.message}</div>

                <button
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                    className="ml-4 text-white hover:text-gray-200 focus:outline-none"
                    aria-label="Fermer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NotificationBar;