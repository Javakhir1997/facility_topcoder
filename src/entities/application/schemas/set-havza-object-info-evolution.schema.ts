import { z } from 'zod';

export const setHavzaObjectEvolutionDTOSchema = z.object({
    evaluation_confirmation_documents: z.boolean({message: 'required field!'})
})
