import { z } from 'zod';
import { GENRE } from '../constants';
export const formSchema = z.object({
  title: z.string().min(1, { message: 'This field is required' }),
  author: z.string().min(1, { message: 'This field is required' }),
  genre: z.enum(GENRE, { message: 'This field is required' }),
  year: z
    .string()
    .regex(/^\d+$/, { message: 'Year must be a number' })
    .refine((val) => Number(val) <= new Date().getFullYear(), {
      message: 'Year cannot be in the future',
    }),
  pages: z
    .string()
    .regex(/^\d+$/, { message: 'Pages must be a number' })
    .refine((val) => Number(val) > 0, {
      message: 'Pages must be greater than 0',
    }),
  publisher: z.string().min(1, { message: 'This field is required'}),
});

export type FormValues = z.infer<typeof formSchema>;
