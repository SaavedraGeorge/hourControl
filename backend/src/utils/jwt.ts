import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL: La variable de entorno JWT_SECRET no está definida.');
}

export const generateToken = (payload: { id: number; email: string; role: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};