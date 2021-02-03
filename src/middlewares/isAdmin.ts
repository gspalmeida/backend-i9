import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: userId } = decoded as TokenPayload;

    if (userId !== '7d1a9d59-517e-4340-afe3-fdcf99c3a45b') {
      throw new AppError(
        'You dont have the credentials to access this route',
        401,
      );
    }
    request.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token!', 401);
  }
}
