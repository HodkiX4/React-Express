class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

class UserNotFoundError extends AppError {
  constructor() {
    super('User not found', 404);
  }
}

class InvalidCredentialsError extends AppError {
  constructor(message?: string) {
    super(message || 'Invalid email or password', 400);
  }
}

class UserAlreadyExistsError extends AppError {
  constructor() {
    super('User already exists', 400);
  }
}


export { 
  AppError, NotFoundError, BadRequestError, ValidationError, UnauthorizedError,
  UserNotFoundError, InvalidCredentialsError, UserAlreadyExistsError
}