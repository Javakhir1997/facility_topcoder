import { z } from 'zod';
import { format } from 'date-fns';
export const AttachPerformerDTOSchema = z.object({
    responsibility: z.array(z.object({
        performer: z.number(),
        deadline: z.date({ required_error: 'Tekshirish sanasi kiritilmadi!' })
            .transform((date) => format(date, 'yyyy-MM-dd')),
    })),
});
