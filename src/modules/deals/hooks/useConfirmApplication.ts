import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";
import {showMessage} from "@app/shared";
import {useParams} from "react-router-dom";


const UseConfirmApplication = () => {
    const {id = ''} = useParams();

    const queryClient = useQueryClient()

    const {isPending: isConfirmPending, mutate: confirmApplication} = useMutation({
        mutationFn: () => apiClient.patch(`${API_ENDPOINTS.APPLICATION_CONFIRM}/${id}`,),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['application-detail'],
            });
            showMessage("Successfully", "success")
        }
    })

    return {isConfirmPending, confirmApplication}
};

export default UseConfirmApplication;
