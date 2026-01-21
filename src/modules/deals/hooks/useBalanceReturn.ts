import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {IOperatorReturnAppealForm} from "@app/interfaces";
import {AppealService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (reset: () => void) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending: isOperatorPending, mutate: operatorReturnAppeal} = useMutation({
        mutationFn: (data: IOperatorReturnAppealForm) => AppealService.operatorReturnAppeal(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            reset()
        }
    })

    return {isOperatorPending, operatorReturnAppeal}
}

export default Index;