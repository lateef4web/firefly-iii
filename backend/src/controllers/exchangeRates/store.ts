import { Request, Response } from 'express';

const storeExchangeRate = (req: Request, res: Response) => {
  const data = req.body;
  res.status(201).json({ message: 'store exchange rate', data });
};

export default storeExchangeRate;
