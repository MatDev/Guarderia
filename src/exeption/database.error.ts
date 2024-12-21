import { CustomError } from './custom.error';

export class DatabaseError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 500, details);
    this.name = 'DatabaseError';
  }
}