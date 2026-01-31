import { useMutation } from '@tanstack/react-query'
import { DealService } from '@app/services'
import { useNavigate, useParams } from 'react-router-dom'
import { showMessage } from "@app/shared";
// ✅ Ikkalasini ham import qiling
import { AttachPerformerDealDTO, AttachPerformerDealDTOSchema } from "@entities/deal";
import useAccountsList from "@hooks/useAccountsList.ts";
import { useEffect, useState } from "react";
import { ISelectOption } from "@app/interfaces";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useAttachRegisterCodeMinistryDeal() {

    

    // ✅ Generic (<...>) ichiga TYPE beriladi
    const form = useForm<any>({
        // ✅ Resolver (...) ichiga SCHEMA beriladi
        // resolver: zodResolver(AttachPerformerDealDTOSchema), 
        defaultValues: {
            register_code:null
        }
    });

    // const { fields, append, remove } = useFieldArray({
    //     control: form.control,
    //     name: "performers"
    // });

    // ... (qolgan kodlar o'zgarishsiz)

    const { id = '' } = useParams()
    const navigate = useNavigate();

    const { isPending, mutate: attachRegisterCode } = useMutation({
        mutationFn: (data: any) => {
            console.log('Backendga ketayotgan data:', data);
            return DealService.attachRegisterCodeHeadDeal(Number(id), data);
        },
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return { 
        isPending, 
        attachRegisterCode, 
        form 
    }
}