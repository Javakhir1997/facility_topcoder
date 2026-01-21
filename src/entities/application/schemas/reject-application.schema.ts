import { z } from 'zod';

export const rejectApplicationDTOSchema = z.object({
    rejection_text: z.string({ message: 'Izoh kiritilmadi!' }).min(1, 'Izoh kiritilmadi!'),
    rejection_file: z.object({
        id: z.number(),
        file: z.string()
    }).transform((date) => date.id),
});
