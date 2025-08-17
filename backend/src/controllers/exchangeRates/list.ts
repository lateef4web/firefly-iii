import { Request, Response } from 'express';

const listExchangeRates = (_req: Request, res: Response) => {
  res.json({ message: 'list exchange rates' });
};

export default listExchangeRates;
