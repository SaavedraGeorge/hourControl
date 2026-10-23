import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Interfaz para extender la solicitud de Express con los datos del usuario
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <TOKEN>"

  if (!token) {
    res.status(401).json({
      error: {
        status: 401,
        message: 'Acceso denegado. Token no proporcionado.',
      },
    });
    return;
  }

  try {
    const decoded = verifyToken(token) as { id: number; email: string; role: string };
    req.user = decoded; // Adjuntamos los datos del usuario decodificados a la petición
    next();
  } catch (error) {
    res.status(403).json({
      error: {
        status: 403,
        message: 'Token inválido o expirado.',
      },
    });
  }
};