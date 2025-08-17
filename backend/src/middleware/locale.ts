import { Request, Response, NextFunction } from 'express';

export default function locale(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers['accept-language'];
  const lang = Array.isArray(header)
    ? header[0]
    : (header || '').split(',')[0];
  (req as any).locale = lang || 'en';
  return next();
}
