
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {ApplicationService} from "@app/services";
import {ConfirmConceptionDTO} from "@entities/conception";


const useConfirmMinistryHeadConception = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: confirmMinistryHeadConception} = useMutation({
        mutationFn: (data: ConfirmConceptionDTO) => ApplicationService.confirmMinistryHeadConception(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {confirmMinistryHeadConception, isPending}
};

export default useConfirmMinistryHeadConception;
