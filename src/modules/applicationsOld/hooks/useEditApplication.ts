import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {IApplicationForm} from "@app/interfaces";
import {ApplicationService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: editApplication} = useMutation({
        mutationFn: (data: IApplicationForm) => ApplicationService.editApplication(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate('/applications');
            reset()
        }
    })

    return {isPending, editApplication}
}

export default Index;