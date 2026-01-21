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


const UseRejectApplication = () => {

    const form = useForm<RejectApplicationDTO>({
        resolver: zodResolver(rejectApplicationDTOSchema),
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending: isRejectPending, mutate: rejectApplication} = useMutation({
        mutationFn: (data: RejectApplicationDTO) => apiClient.patch(`${API_ENDPOINTS.APPLICATION_REJECT}/${id}`, data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            form.reset()
        }
    })

    return {form, rejectApplication, isRejectPending}
};

export default UseRejectApplication;
