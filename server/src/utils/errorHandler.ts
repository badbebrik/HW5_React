import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
};
