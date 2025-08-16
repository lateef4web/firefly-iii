import { Request, Response, NextFunction } from 'express';

export default function (_req: Request, _res: Response, next: NextFunction): void {
  next();
}
