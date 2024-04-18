import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(8),
  password2: z.string().min(8),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  gender: z.enum(['male', 'female']),
  zonecode: z.string().min(5),
  address1: z.string().min(1),
  address2: z.string().optional(),
  is_subscribed: z.boolean(),
  subscribed: z.enum(['email', 'kakao']),
  is_assigned: z.boolean(),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type SignupType = z.infer<typeof signupSchema>;
