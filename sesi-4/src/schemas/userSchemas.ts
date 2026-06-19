// src/schemas/userSchema.ts
import { z } from 'zod';

export const userSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter')
      .max(50, 'Nama lengkap maksimal 50 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[0-9]/, 'Password harus mengandung angka'),
    confirmPassword: z.string(),
    age: z
      .number({ invalid_type_error: 'Umur harus angka' })
      .min(17, 'Umur minimal 17 tahun')
      .max(100, 'Umur maksimal 100 tahun'),
    website: z
      .string()
      .url('Format URL tidak valid')
      .optional()
      .or(z.literal('')),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: 'Anda harus menyetujui syarat dan ketentuan' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export type UserFormData = z.infer<typeof userSchema>;