import { Request, Response, NextFunction } from 'express';

const requests = new Map<string, { count: number; time: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 60;

export default function throttle(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  const ip = req.ip;
  const record = requests.get(ip) || { count: 0, time: now };

  if (now - record.time > WINDOW_MS) {
    record.count = 1;
    record.time = now;
  } else {
    record.count += 1;
  }

  requests.set(ip, record);

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  return next();
}
