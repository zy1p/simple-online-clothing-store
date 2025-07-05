import { z } from 'zod/v4';

export const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), {
      message: 'Password must contain at least one number',
    })
    .refine(
      (password) => /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
      {
        message: 'Password must contain at least one special character',
      },
    ),

  email: z.email({ message: 'Invalid email address' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.e164().optional(),
});
