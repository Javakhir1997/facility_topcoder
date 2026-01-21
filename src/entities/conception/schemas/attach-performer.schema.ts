import { z } from 'zod';
import { format } from 'date-fns';

export const AttachPerformerDTOSchema = z.object({
    // ❌ Eski: responsibility
    // ✅ Yangi: performers
    performers: z.array(z.object({
        performer: z.number(),
        deadline: z.date({ required_error: 'Tekshirish sanasi kiritilmadi!' })
            .transform((date) => format(date, 'yyyy-MM-dd')),
    })),
});

// Type ni ham yangilang (agar alohida faylda bo'lsa)
export type AttachPerformerDTO = z.infer<typeof AttachPerformerDTOSchema>;
