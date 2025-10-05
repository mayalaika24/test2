import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(1),
});

export type FormValues = z.infer<typeof formSchema>;
