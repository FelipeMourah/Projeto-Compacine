import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function ErrorHandler(
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  return response.status(error.code).json({
    code: error.code,
    status: error.status,
    message: error.message,
    details: error.details,
  });
}
