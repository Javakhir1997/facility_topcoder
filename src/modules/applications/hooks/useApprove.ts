import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {AppealService, ApplicationService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (application?: boolean) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending, mutate: approveAppeal, mutateAsync: approveAppealAsync} = useMutation({
        mutationFn: () => application ? ApplicationService.approveAppeal(id) : AppealService.approveAppeal(id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {isPending, approveAppeal, approveAppealAsync}
}

export default Index;