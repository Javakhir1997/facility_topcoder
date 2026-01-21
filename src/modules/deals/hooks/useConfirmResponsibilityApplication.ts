import {useFieldArray, useForm} from "react-hook-form";
import {
    SetApplicationResponsibilityDTO,
    setApplicationResponsibilityDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import useAccountsList from "@hooks/useAccountsList.ts";
import {useEffect, useState} from "react";
import {ISelectOption} from "@app/interfaces";


const UseConfirmResponsibilityApplication = () => {

    const {id = ''} = useParams();

    const form = useForm<SetApplicationResponsibilityDTO>({
        resolver: zodResolver(setApplicationResponsibilityDTOSchema),
        defaultValues: {
            responsibility: [
                {
                    id: 0,
                    deadline: ""
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "responsibility"
    });

    const {data: responsibilityList, isPending: isPendingResponsibilityList} = useAccountsList('ministry_dxsh_b_x')

    const [responsibilityListOptions, setResponsibilityListOptions] = useState<ISelectOption[]>([])

    useEffect(() => {
        if(!responsibilityList) return
        setResponsibilityListOptions(responsibilityList)
    }, [responsibilityList]);

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {isPending: isSetResponsibilityPending, mutate: setApplicationResponsibility} = useMutation({
        mutationFn: (data: SetApplicationResponsibilityDTO) => apiClient.post(`${API_ENDPOINTS.APPLICATION_SET_RESPONSIBILITY}`, {
            application: id,
            performers: data.responsibility
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['application-detail'],
            });
            showMessage("Successfully", "success")
            navigate(-1)
            form.reset()
        }
    })


    return {
        form,
        responsibilityListOptions,
        fields,
        append,
        remove,
        setApplicationResponsibility,
        isSetResponsibilityPending,
        isPendingResponsibilityList,
    }
};

export default UseConfirmResponsibilityApplication;
