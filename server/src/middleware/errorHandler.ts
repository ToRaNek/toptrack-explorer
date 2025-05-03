import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Une erreur interne est survenue',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};