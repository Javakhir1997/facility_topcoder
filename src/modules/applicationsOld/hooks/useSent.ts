import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {ISentForm} from "@app/interfaces";
import {ApplicationService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (reset: () => void) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending, mutate: sentApplication} = useMutation({
        mutationFn: (data: ISentForm) => ApplicationService.sentAppeal(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            reset()
        }
    })

    return {isPending, sentApplication}
}

export default Index;