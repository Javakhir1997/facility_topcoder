import {useForm} from "react-hook-form";
import {
    SetBalanceApplicationDTO,
    setBalanceApplicationDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";


const UseBalanceApplication = () => {

    const form = useForm<SetBalanceApplicationDTO>({
        resolver: zodResolver(setBalanceApplicationDTOSchema),
        defaultValues: {
            object_evaluation_balance_organization: false,
        }
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending: isRejectPending, mutate: setBalanceApplication} = useMutation({
        mutationFn: (data: SetBalanceApplicationDTO) => apiClient.patch(`${API_ENDPOINTS.APPLICATION_SET_BALANCE}/${id}`, data),
        onSuccess: (data) => {
            console.log(data, 'data-rk')
            if(data.success){
                showMessage("Successfully", "success")
                navigate(-1)
                form.reset()
            }else {
                showMessage("Error", "error")
            }

        }
    })

    return {form, setBalanceApplication, isRejectPending}
};

export default UseBalanceApplication;
