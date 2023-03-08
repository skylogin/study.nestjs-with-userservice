import { Request, Response, NextFunction } from 'express';

export function Logger3Middleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request3...');
  next();
}
