import { User } from '@lib/db';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
