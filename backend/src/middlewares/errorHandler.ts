import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  // Mostrar el stack del error únicamente en entorno de desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error ${statusCode}]: ${err.stack || message}`);
  }

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  });
};