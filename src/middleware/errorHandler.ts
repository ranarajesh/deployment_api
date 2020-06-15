import { Request, Response, NextFunction } from 'express';
import CustomErrorResponse from '../utills/customErrorResponse';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;
  // Mongoose Cast to bad ObjectId
  if (error.kind === 'ObjectId') {
    const message = `Resource Not Found with provide id ${error.value}`;
    error = new CustomErrorResponse(message, 404);
  }

  // Mongoose Duplicate objectId
  if (error.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new CustomErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

export default errorHandler;
