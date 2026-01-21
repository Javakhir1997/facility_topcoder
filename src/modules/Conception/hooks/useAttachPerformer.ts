import {useMutation} from '@tanstack/react-query'
import {ApplicationService} from '@app/services'
import {useNavigate, useParams} from 'react-router-dom'
import {showMessage} from "@app/shared";
import {AttachPerformerDTO, AttachPerformerDTOSchema} from "@entities/conception";
import useAccountsList from "@hooks/useAccountsList.ts";
import {useEffect, useState} from "react";
import {ISelectOption} from "@app/interfaces";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


export default function Index() {

    const {data: responsibilityList, isPending: isPendingResponsibilityList} = useAccountsList('ministry_dxsh_b_x')

    const form = useForm<AttachPerformerDTO>({
        resolver: zodResolver(AttachPerformerDTOSchema),
        defaultValues: {
            responsibility: [
                {
                    performer: 0,
                    deadline: ""
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "responsibility"
    });


    const [responsibilityListOptions, setResponsibilityListOptions] = useState<ISelectOption[]>([])

    useEffect(() => {
        if(!responsibilityList) return
        setResponsibilityListOptions(responsibilityList)
    }, [responsibilityList]);

    const {id = ''} = useParams()
    const navigate = useNavigate();
    const {isPending, mutate: attachPerformer} = useMutation({
        mutationFn: (data: AttachPerformerDTO) =>  ApplicationService.attachPerformerToConception(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })
    return {isPending, attachPerformer, responsibilityListOptions, isPendingResponsibilityList, fields, append, remove, form}
}
