import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";
import {showMessage} from "@app/shared";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {setHavzaObjectEvolutionDTO, setHavzaObjectEvolutionDTOSchema} from "@entities/application";


const UseConfirmByHavzaApplication = () => {
    const {id = ''} = useParams();

    const queryClient = useQueryClient()

    const form = useForm<setHavzaObjectEvolutionDTO>({
        resolver: zodResolver(setHavzaObjectEvolutionDTOSchema),
    });

    // const navigate = useNavigate();

    const {isPending: isConfirmPending, mutate: confirmByHavzaDeal} = useMutation({
        mutationFn: (data: boolean) => apiClient.put(`${API_ENDPOINTS.DEAL_CONFIRM_BY_HAVZA}/${id}`, {
            evaluation_confirmation_documents: data
        }),
        onSuccess: () => {
            showMessage("Successfully", "success")
            queryClient.invalidateQueries({
                queryKey: ['application-detail'],
            });
            // navigate(-1)
            form.reset()
        }
    })

    return {isConfirmPending, confirmByHavzaDeal, form}
};

export default UseConfirmByHavzaApplication;
