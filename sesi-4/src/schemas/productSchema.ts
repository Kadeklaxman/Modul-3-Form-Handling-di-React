import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),

  price: z.coerce.number().positive("Harga harus lebih dari 0"),

  stock: z.coerce
    .number()
    .int("Stok harus bilangan bulat")
    .min(0, "Stok tidak boleh negatif"),

  category: z.enum(["electronics", "fashion", "food"], {
    message: "Pilih kategori",
  }),

  imageUrl: z
    .string()
    .url("Format URL tidak valid")
    .optional()
    .or(z.literal("")),
});

export type ProductFormData = z.infer<typeof productSchema>;
