import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {ApplicationService} from "@app/services";
import {IApplicationForm} from "@app/interfaces";

const Index = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: addApplication} = useMutation({
        mutationFn: (data: IApplicationForm) => ApplicationService.addApplication(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate('/applications');
            reset()
        }
    })

    return {isPending, addApplication}
}

export default Index;