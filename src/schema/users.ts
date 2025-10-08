import { z } from 'zod';
import { phone_regex } from '../constants';
export const formSchema = z.object({
  name: z.string().min(1, {message: 'This field required'}),
  email: z.string()
    .min(1, { message: 'This field is required' })
    .email({ message: 'Invalid email address' }),
  phone: z.string()
    .min(1, { message: 'This field is required' })
    .regex(phone_regex, { message: 'Phone number must be similar to 09xxxxxxxx' }),
  address: z.string().min(1, {message: 'This field required'}),
});

export type FormValues = z.infer<typeof formSchema>;
