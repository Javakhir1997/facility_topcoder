import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {IAppealForm} from "@app/interfaces";
import {AppealService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: editAppeal} = useMutation({
        mutationFn: (data: IAppealForm) => AppealService.editAppeal(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate('/appeals');
            reset()
        }
    })

    return {isPending, editAppeal}
}

export default Index;