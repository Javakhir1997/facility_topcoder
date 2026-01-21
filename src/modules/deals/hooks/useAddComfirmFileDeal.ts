import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { showMessage } from "@app/shared";
import { AppealService, DealService } from "@app/services";
import { IConfirmDealFilesForm } from "@app/interfaces";

const Index = (reset: () => void) => {
    const navigate = useNavigate();
    const { id = '' } = useParams()
    console.log
    const { isPending, mutate: addConfirmFilesDeal } = useMutation({
        mutationFn: (data: IConfirmDealFilesForm) => DealService.addConfirmFilesDeal(data, id),
        onSuccess: (data) => {
            showMessage("Successfully", "success");
            reset()

        }
    })

    return { isPending, addConfirmFilesDeal }
}

export default Index;
