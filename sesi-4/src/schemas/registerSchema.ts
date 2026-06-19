import { z } from 'zod';

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter'),

    email: z
      .string()
      .email('Format email tidak valid'),

    password: z
      .string()
      .min(8, 'Password minimal 8 karakter'),

    confirmPassword: z.string(),

    birthDate: z
      .string()
      .min(1, 'Tanggal lahir wajib diisi'),

    phone: z
      .string()
      .regex(
        /^(08|\+62)[0-9]{8,13}$/,
        'Nomor telepon tidak valid'
      ),

    gender: z.enum(
      ['male', 'female', 'other'],
      {
        message: 'Pilih jenis kelamin',
      }
    ),

    hobbies: z
      .array(z.string())
      .min(1, 'Pilih minimal satu hobi'),

    bio: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine(
        (value) =>
          value === '' ||
          value.length >= 20,
        {
          message:
            'Bio minimal 20 karakter',
        }
      ),

    agreeToTerms: z.boolean().refine(
      (value) => value,
      {
        message:
          'Anda harus menyetujui syarat dan ketentuan',
      }
    ),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ['confirmPassword'],
      message:
        'Konfirmasi password tidak cocok',
    }
  );

export type RegisterFormData =
  z.infer<typeof registerSchema>;