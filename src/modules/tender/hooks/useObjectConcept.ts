import {useForm} from "react-hook-form";
import {
    SetObjectConceptDTO,
    setObjectConceptDTOSchema
} from "@entities/application";
import { zodResolver } from '@hookform/resolvers/zod';
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";


const useObjectConcept = () => {

    const form = useForm<SetObjectConceptDTO>({
        resolver: zodResolver(setObjectConceptDTOSchema),
        defaultValues: {

        }
    });

    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: setObjectConcept} = useMutation({
        mutationFn: (data: SetObjectConceptDTO) => apiClient.post(`${API_ENDPOINTS.APPLICATION_SET_OBJECT_CONCEPT}`, {
            ...data,
            application: id,
        }),
        onSuccess: () => {
            showMessage("Successfully", "success")
            apiClient.put(`${API_ENDPOINTS.APPLICATION_SET_OBJECT_CONCEPT}`, {
                if_full: true
            })
            navigate(-1)
            form.reset()
        }
    })



    return {form, setObjectConcept, isPending}
};

export default useObjectConcept;
