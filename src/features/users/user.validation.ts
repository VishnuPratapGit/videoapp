import * as z from 'zod';

export const createUserInputSchema = z.object({
  username: z.string().trim().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export const signInUserInputSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});