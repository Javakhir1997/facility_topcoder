
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {ApplicationService} from "@app/services";
import {ConfirmConceptionDTO} from "@entities/conception";


const UseConfirmConception = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: confirmConception} = useMutation({
        mutationFn: (data: ConfirmConceptionDTO) => ApplicationService.confirmConception(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {confirmConception, isPending}
};

export default UseConfirmConception;
