
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {ApplicationService} from "@app/services";


const useSendToMinistryConception = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: sendToMinistry} = useMutation({
        mutationFn: () => ApplicationService.sendToMinistryConception(Number(id)),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {sendToMinistry, isPending}
};

export default useSendToMinistryConception;
