import { Request, Response } from 'express';

const deleteExchangeRate = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `delete exchange rate ${id}` });
};

export default deleteExchangeRate;
