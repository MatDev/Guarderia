import { CustomError } from './custom.error';

export class ValidationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}