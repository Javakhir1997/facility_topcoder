import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {AppealService, ApplicationService} from "@app/services";
import {IReplyAppealForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";

const Index = (reset: () => void, application?: boolean) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending, mutate: replyAppeal} = useMutation({
        mutationFn: (data: IReplyAppealForm) => application ? ApplicationService.replyAppeal(data, id) : AppealService.replyAppeal(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            reset()
        }
    })

    return {isPending, replyAppeal}
}

export default Index;