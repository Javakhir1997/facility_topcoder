import { useMutation } from '@tanstack/react-query'
import { ApplicationService, DealService } from '@app/services'
import { useNavigate, useParams } from 'react-router-dom'
import { showMessage } from "@app/shared";
import { AttachPerformerDealDTO, AttachPerformerDealDTOSchema } from "@entities/deal";
import useAccountsList from "@hooks/useAccountsList.ts";
import { useEffect, useState } from "react";
import { ISelectOption } from "@app/interfaces";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useAttachPerformerDeal() {

    const { data: responsibilityList, isPending: isPendingResponsibilityList } = useAccountsList('ministry_m_b_b')

    const form = useForm<AttachPerformerDealDTO>({
        resolver: zodResolver(AttachPerformerDealDTOSchema),
        defaultValues: {
            // ✅ ENG MUHIM JOYI: Backend "performers" kutyapti, shuning uchun bu yerda ham "performers"
            performers: [
                {
                    performer: 0,
                    deadline: "" as any // Date picker bo'sh bo'lganda muammo chiqmasligi uchun
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        // ✅ Formadagi kalit so'z bilan bir xil bo'lishi shart ("performers")
        name: "performers"
    });

    const [responsibilityListOptions, setResponsibilityListOptions] = useState<ISelectOption[]>([])

    useEffect(() => {
        if (!responsibilityList) return
        setResponsibilityListOptions(responsibilityList)
    }, [responsibilityList]);

    const { id = '' } = useParams()
    const navigate = useNavigate();

    const { isPending, mutate: attachPerformerDeal } = useMutation({
        mutationFn: (data: AttachPerformerDealDTO) => {
            // Endi "data" ning o'zi Backend kutgan formatda:
            // { performers: [ {performer: 1, ...} ] }
            
            console.log('Backendga ketayotgan toza data:', data);

            // Shunchaki "data" ni yuboramiz, ortiqcha o'zgartirish shart emas
            return DealService.attachPerformerToDeal(Number(id), data);
        },
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return { 
        isPending, 
        attachPerformerDeal, 
        responsibilityListOptions, 
        isPendingResponsibilityList, 
        fields, 
        append, 
        remove, 
        form 
    }
}