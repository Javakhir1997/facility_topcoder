import { z } from 'zod';

export const rejectByPerformerApplicationDTOSchema = z.object({
    evaluation_text: z.string({ message: 'Izoh kiritilmadi!' }).min(1, 'Izoh kiritilmadi!'),
    evaluation_file: z.object({
        id: z.number(),
        file: z.string()
    }).transform((date) => date.id),
})
