import { Request, Response, NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
