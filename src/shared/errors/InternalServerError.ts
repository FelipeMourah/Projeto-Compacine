import { NextFunction, Request, Response } from 'express';
import AppError from './AppError';

export default function InternalServerError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  const serverError = new AppError(
    500,
    'Internal Server Error',
    'The server has encountered a situation it does not know how to handle',
  );
  return response.status(serverError.code).json({
    code: serverError.code,
    status: serverError.status,
    message: serverError.message,
    details: serverError.details,
  });
}
