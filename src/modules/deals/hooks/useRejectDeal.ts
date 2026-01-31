import {useForm} from "react-hook-form";
import {
    type RejectApplicationDTO,
    rejectApplicationDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";
import { RejectDealDTO, rejectDealDTOSchema } from "@entities/deal";
import { ConfirmDealDTOSchema } from "@entities/deal/schemas";



const useRejectDeal = () => {

    const form = useForm<RejectApplicationDTO>({
        resolver: zodResolver(rejectDealDTOSchema),
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending: isRejectPending, mutate: rejectDeal} = useMutation({
        mutationFn: (data: RejectDealDTO) => apiClient.patch(`${API_ENDPOINTS.DEAL_REJECT_FINANCE_DXSH}/${id}`, data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            form.reset()
        }
    })

    return {form, rejectDeal, isRejectPending}
};

export default useRejectDeal;
