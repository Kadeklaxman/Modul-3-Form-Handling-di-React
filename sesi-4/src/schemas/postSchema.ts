import {z} from 'zod';

export const postSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(100, 'Judul maksimal 100 karakter'),
  category: z.enum(['programming', 'design', 'technology'], {
    errorMap: () => ({ message: 'Kategori harus dipilih' }),
  }),
  content: z.string().min(20, 'Konten minimal 20 karakter'),
    tags: z.array(z.string().min(1, 'Tag minimal 1 karakter')).max(5, 'Maksimal 5 tag'),
    status: z.enum(['draft', 'published'], {
    errorMap: () => ({ message: 'Status harus dipilih' }),
  }),
});