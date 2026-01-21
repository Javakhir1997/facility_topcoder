import { z } from 'zod';

export const setBalanceApplicationDTOSchema = z.object({
    object_evaluation_balance_organization: z.boolean({ message: 'required field!' }),
    object_evaluation_balance_organization_text: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.object_evaluation_balance_organization && !data.object_evaluation_balance_organization_text) {
        console.log(data, 'data')
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "object_evaluation_balance_organization_text обязательно",
            path: ["object_evaluation_balance_organization_text"],
        });
    }
});;
