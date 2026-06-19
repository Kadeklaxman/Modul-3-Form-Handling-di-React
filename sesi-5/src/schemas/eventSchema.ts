import { z } from "zod";

export const eventSchema = z.object({
  // Step 1
  title: z
    .string()
    .min(3, "Judul event minimal 3 karakter"),

  category: z
    .string()
    .min(1, "Kategori wajib dipilih"),

  date: z
    .string()
    .min(1, "Tanggal wajib diisi"),

  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter"),

  // Step 2
  venueType: z.enum(["online", "offline"]),

  location: z
    .string()
    .min(3, "Alamat / URL wajib diisi"),

  ticketPrice: z.coerce
    .number()
    .min(0, "Harga tiket tidak valid"),

  quota: z.coerce
    .number()
    .min(1, "Kuota minimal 1"),

  // Step 3
  confirm: z.literal(true, {
    errorMap: () => ({
      message: "Anda harus mengonfirmasi data",
    }),
  }),
});

export type EventFormData = z.infer<
  typeof eventSchema
>;