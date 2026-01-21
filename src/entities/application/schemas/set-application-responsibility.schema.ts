import { z } from 'zod';
import { format } from 'date-fns';
export const setApplicationResponsibilityDTOSchema = z.object({
    responsibility: z.array(z.object({
        id: z.number(),
        deadline: z.date({ required_error: 'Tekshirish sanasi kiritilmadi!' })
            .transform((date) => format(date, 'dd-MM-yyyy')),
    })),
});
