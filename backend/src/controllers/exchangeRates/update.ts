import { Request, Response } from 'express';

const updateExchangeRate = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  res.json({ message: `update exchange rate ${id}`, data });
};

export default updateExchangeRate;
