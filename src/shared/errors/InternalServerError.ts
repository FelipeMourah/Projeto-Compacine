import { NextFunction, Request, Response } from 'express';

export default function InternalServerError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  return response.status(500).json({
    code: 500,
    status: 'Internal Server Error',
    message:
      'The server has encountered a situation it does not know how to handle',
  });
}
