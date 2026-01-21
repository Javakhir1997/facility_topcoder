import { z } from 'zod';

export const ConfirmConceptionDTOSchema = z.object({
    reject: z.boolean({ message: 'required field!' }),
    reject_text: z.string({ message: 'Izoh kiritilmadi!' }).min(1, 'Izoh kiritilmadi!').optional(),
    reject_file: z.object({
        id: z.number(),
        file: z.string()
    }).transform((date) => date.id).optional(),
}).superRefine((data, ctx) => {
    if (data.reject && !data.reject_text) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "rejection_text обязательно",
            path: ["rejection_text"],
        });
    }
    if (data.reject && !data.reject_file) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "rejection_file обязательно",
            path: ["rejection_file"],
        });
    }
});;;
