import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {ApplicationService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = () => {
    const navigate = useNavigate();

    const {isPending, mutateAsync: editApplicationFiles} = useMutation({
        mutationFn: ({data, id}: { data: string | number, id: string | number }) =>
            ApplicationService.editApplicationFiles(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate('');
        }
    })

    return {isPending, editApplicationFiles}
}

export default Index;