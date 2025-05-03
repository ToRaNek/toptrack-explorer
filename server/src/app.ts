import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './config';
import { errorHandler } from './middleware/errorHandler';

// Import des routes
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';

const app = express();

// Middleware de base
app.use(cors({
    origin: config.clientUrl,
    credentials: true
}));
app.use(helmet()); // Sécurité des headers HTTP
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Compression GZIP
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;