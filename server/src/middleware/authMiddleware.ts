import { AuthenticationError } from 'apollo-server-express';

export function authenticate(context: any) {
  if (!context.user) {
    throw new AuthenticationError('You must be logged in');
  }
}
