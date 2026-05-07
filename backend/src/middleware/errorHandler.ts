// backend/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', error);

  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  // Handle Prisma errors
  if (error.code === 'P2002') {
    return res.status(409).json({ error: 'Unique constraint violation' });
  }

  if (error.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
};

export default errorHandler;
