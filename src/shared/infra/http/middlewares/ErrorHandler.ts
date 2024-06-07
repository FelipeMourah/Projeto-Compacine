import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.code).json({
      code: error.code,
      status: error.status,
      message: error.message,
      details: error.details,
    });
  }
  return response.status(500).json({
    code: 500,
    status: 'Internal Server Error',
    message:
      'The server has encountered a situation it does not know how to handle',
    details: error.message,
  });
}
