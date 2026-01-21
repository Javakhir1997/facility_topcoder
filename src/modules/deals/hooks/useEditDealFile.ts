import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {IEditDealConfirm} from "@app/interfaces";
import {DealService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: editDealFile} = useMutation({
        mutationFn: (data: IEditDealConfirm) => DealService.editDealConfirm(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate('/deals');
            reset()
        }
    })

    return {isPending, editDealFile}
}

export default Index;