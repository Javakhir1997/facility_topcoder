import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {AppealService, ElectricityService, InvestmentService} from "@app/services";
import {IReturnAppealForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";

const Index = (reset: () => void, report?: boolean, electricity?: boolean) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending, mutate: returnAppeal} = useMutation({
        mutationFn: (data: IReturnAppealForm) => electricity ? ElectricityService.returnReport(data, id) : report ? InvestmentService.returnReport(data, id) : AppealService.returnAppeal(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
            reset()
        }
    })

    return {isPending, returnAppeal}
}

export default Index;