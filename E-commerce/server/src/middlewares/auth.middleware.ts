import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/costum';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/app.errors';

const JWT_SECRET = process.env.JWT_SECRET as string;

const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if(!token) {
    return next(new UnauthorizedError('Authentication token missing'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string} ;
    req.userId= decoded.userId;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}

export default authenticate;