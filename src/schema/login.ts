import z from 'zod';
export const formSchema = z.object({
  username: z.string().min(1, 'field_required'),
  password: z.string().min(1, 'field_required'),
});

export type FormValues = z.infer<typeof formSchema>;
