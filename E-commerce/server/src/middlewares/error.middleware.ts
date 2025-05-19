import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../errors/app.errors';
import logger from '../utils/logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Something went wrong";
  // Known costum AppErrors
  if(err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } 

  // Mongoose Validation Errors
  else if(err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors = Object.values(err.errors).map(error => error.message);
    message = errors.join(", ");
  }

  else if(err.code === 11000) {
    statusCode = 400;
    message = `Duplicate value entered for field: ${Object.keys(err.keyValue).join(", ")}`;
  }

  // Handle CastError
  else if(err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // JWT errors
  else if(err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if(err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

   // Log the error using Winston
   logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });

  next(err);
};

export default errorHandler;