import { CustomError } from './custom.error';

export class AuthorizationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 403, details);
    this.name = 'AuthorizationError';
  }
}