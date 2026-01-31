


import {
    ConfirmDealDTOSchema,
    AttachPerformerDealDTOSchema,
    rejectDealDTOSchema,
} from '@entities/deal/schemas'

import { z } from 'zod';

export type ConfirmConceptionDTO = z.infer<typeof ConfirmDealDTOSchema>;
export type AttachPerformerDTO = z.infer<typeof AttachPerformerDealDTOSchema>;
export type RejectDealDTO = z.infer<typeof rejectDealDTOSchema>;
