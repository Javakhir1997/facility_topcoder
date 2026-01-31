import { z } from 'zod';

export const rejectDealDTOSchema = z.object({
  reject: z.boolean().default(true), // Default true qilib qo'yish kerak
  reject_text: z.string().optional(),
  reject_file: z.object({
    id: z.number(),
    file: z.string()
  }).transform((date) => date.id).optional(),
}).superRefine((data, ctx) => {
  // Agar reject true bo'lsa, text va file majburiy bo'ladi
  if (data.reject) {
    if (!data.reject_text || data.reject_text.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Izoh yozish majburiy!",
        path: ["reject_text"], // <-- O'ZGARDI: rejection_text EMAS
      });
    }
    if (!data.reject_file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fayl yuklash majburiy!",
        path: ["reject_file"], // <-- O'ZGARDI: rejection_file EMAS
      });
    }
  }
});