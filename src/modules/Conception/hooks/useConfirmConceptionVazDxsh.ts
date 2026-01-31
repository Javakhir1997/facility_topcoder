
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {ApplicationService} from "@app/services";
import {ConfirmConceptionDTO} from "@entities/conception";


const useConfirmConceptionVazDxsh = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: confirmVazDxshConception} = useMutation({
        mutationFn: (data: ConfirmConceptionDTO) => ApplicationService.confirmVazDxshConception(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {confirmVazDxshConception, isPending}
};

export default useConfirmConceptionVazDxsh;
