import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_development_only';

interface TokenPayload {
  id: string;
  role: string;
}

// Extend Express Request untuk memasukkan data user yang terdekode
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token tidak tersedia atau format salah' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = decoded; // Set user ke request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token tidak valid atau sudah kedaluwarsa' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Tidak ada akses' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Akses ditolak: Role Anda tidak mencukupi' });
      return;
    }

    next();
  };
};
