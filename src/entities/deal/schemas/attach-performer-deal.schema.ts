// src/entities/deal/schemas.ts
import { z } from 'zod';
import { format } from 'date-fns';

// 1. BU SCHEMA (Value - Resolver uchun kerak)
export const AttachPerformerDealDTOSchema = z.object({
    performers: z.array(z.object({
        id: z.number(),
        deadline: z.date({ required_error: 'Sana tanlanmadi' })
            .or(z.string()) // Ba'zan string kelishi mumkin
            .transform((date) => new Date(date)) // Obyektga o'tkazish
            .transform((date) => format(date, 'yyyy-MM-dd')), // Formatlash
    })),
});

// 2. BU TYPE (Interface - useForm generic uchun kerak)
export type AttachPerformerDealDTO = z.infer<typeof AttachPerformerDealDTOSchema>;