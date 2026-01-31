
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {ApplicationService} from "@app/services";
import {ConfirmConceptionDTO} from "@entities/conception";


const useConfirmConceptionFinanceMinistry = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: confirmFinanceMinistryConception} = useMutation({
        mutationFn: (data: ConfirmConceptionDTO) => ApplicationService.confirmFinanceMinistryConception(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {confirmFinanceMinistryConception, isPending}
};

export default useConfirmConceptionFinanceMinistry;
