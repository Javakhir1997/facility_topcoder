
import {
    ConfirmConceptionDTOSchema,
    AttachPerformerDTOSchema,
} from '@entities/conception/schemas'

import { z } from 'zod';

export type ConfirmConceptionDTO = z.infer<typeof ConfirmConceptionDTOSchema>;
export type AttachPerformerDTO = z.infer<typeof AttachPerformerDTOSchema>;


