import { Request, Response } from 'express';

const showExchangeRate = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `show exchange rate ${id}` });
};

export default showExchangeRate;
