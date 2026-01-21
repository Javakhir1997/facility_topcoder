import {
    rejectApplicationDTOSchema,
    setApplicationResponsibilityDTOSchema,
    setBalanceApplicationDTOSchema,
    confirmByPerformerApplicationDTOSchema,
    rejectByPerformerApplicationDTOSchema,
    setBalanceObjectInfoApplicationDTOSchema,
    setObjectConceptDTOSchema, setHavzaObjectEvolutionDTOSchema
} from '@entities/application/schemas'


import { z } from 'zod';

export type SetApplicationResponsibilityDTO = z.infer<typeof setApplicationResponsibilityDTOSchema>;
export type RejectApplicationDTO = z.infer<typeof rejectApplicationDTOSchema>;
export type SetBalanceApplicationDTO = z.infer<typeof setBalanceApplicationDTOSchema>;
export type ConfirmByApplicationDTO = z.infer<typeof confirmByPerformerApplicationDTOSchema>;
export type RejectByPerformerApplicationDTO = z.infer<typeof rejectByPerformerApplicationDTOSchema>;
export type SetBalanceObjectInfoApplicationDTO = z.infer<typeof setBalanceObjectInfoApplicationDTOSchema>;
export type SetObjectConceptDTO = z.infer<typeof setObjectConceptDTOSchema>;
export type setHavzaObjectEvolutionDTO = z.infer<typeof setHavzaObjectEvolutionDTOSchema>;
