import {useForm} from "react-hook-form";
import {
    RejectByPerformerApplicationDTO,
    rejectByPerformerApplicationDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";


const UseRejectByPerformerApplication = () => {

    const form = useForm<RejectByPerformerApplicationDTO>({
        resolver: zodResolver(rejectByPerformerApplicationDTOSchema),
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending: isRejectPending, mutate: rejectByPerformerDeal} = useMutation({
        mutationFn: (data: RejectByPerformerApplicationDTO) => apiClient.patch(`${API_ENDPOINTS.APPLICATION_REJECT_BY_PERFORMER}/${id}`, data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            form.reset()
        }
    })

    return {form, rejectByPerformerDeal, isRejectPending}
};

export default UseRejectByPerformerApplication;
