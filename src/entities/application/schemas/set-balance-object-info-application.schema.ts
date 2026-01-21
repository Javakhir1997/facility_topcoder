import { z } from 'zod';

export const setBalanceObjectInfoApplicationDTOSchema = z.object({
    attachments: z.array(z.object({
        attachment: z.object({
            id: z.number(),
        }).transform((date) => date.id).optional(),
    })),
})
