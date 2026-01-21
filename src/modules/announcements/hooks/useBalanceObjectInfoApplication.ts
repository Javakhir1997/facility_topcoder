import {useFieldArray, useForm} from "react-hook-form";
import {
    SetBalanceObjectInfoApplicationDTO,
    setBalanceObjectInfoApplicationDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";


const useBalanceObjectInfoApplication = () => {

    const form = useForm<SetBalanceObjectInfoApplicationDTO>({
        resolver: zodResolver(setBalanceObjectInfoApplicationDTOSchema),
        defaultValues: {
            attachments: [
                {
                    attachment: undefined
                }
            ]
        }
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "attachments"
    });

    const {isPending, mutate: setBalanceObjectInfo} = useMutation({
        mutationFn: (data: SetBalanceObjectInfoApplicationDTO) => apiClient.post(`${API_ENDPOINTS.APPLICATION_SET_BALANCE_OBJECT_INFO}`, {
            application: id,
            attachments: data.attachments,
        }),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            form.reset()
        }
    })

    return {form, setBalanceObjectInfo, isPending, fields, append, remove}
};

export default useBalanceObjectInfoApplication;
