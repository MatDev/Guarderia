import { CustomError } from './custom.error';

export class AuthenticationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 401, details);
    this.name = 'AuthenticationError';
  }
}