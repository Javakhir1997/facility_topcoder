import {useMutation} from "@tanstack/react-query";
import {ROLE_LIST, showMessage} from "@app/shared";
import {ApplicationService} from "@app/services";
import {IOperatorReturnAppealForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "@app/hooks";

const Index = (reset: () => void) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();
    const {user} = useAppContext();

    const {isPending, mutate: returnApplication} = useMutation({
        mutationFn: (data: IOperatorReturnAppealForm) => ApplicationService.returnAppeal(data, id, user.role === ROLE_LIST.FINANCE_EMPLOYEE ? "mof" : user.role === ROLE_LIST.HEAD ? "director" : "operator"),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            reset()
        }
    })

    return {isPending, returnApplication}
}

export default Index;