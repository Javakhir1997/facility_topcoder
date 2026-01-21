import {useForm} from "react-hook-form";
import {
    ConfirmByApplicationDTO,
    confirmByPerformerApplicationDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";


const UseConfirmByPerformerApplication = () => {

    const form = useForm<ConfirmByApplicationDTO>({
        resolver: zodResolver(confirmByPerformerApplicationDTOSchema),
        defaultValues: {
            object_evaluation_balance_organization: false,
        }
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending: isRejectPending, mutate: confirmByPerformer} = useMutation({
        mutationFn: () => apiClient.patch(`${API_ENDPOINTS.APPLICATION_CONFIRM_BY_PERFORMER}/${id}`),
        onSuccess: (data) => {
            if(data.success){
                showMessage("Successfully", "success")
                navigate(-1)
                form.reset()
            }else {
                showMessage("Error", "error")
            }

        }
    })

    return {form, confirmByPerformer, isRejectPending}
};

export default UseConfirmByPerformerApplication;
