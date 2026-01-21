import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {AppealService, ApplicationService, ElectricityService, InvestmentService} from "@app/services";
import {showMessage} from "@app/shared";

const Index = (application?: boolean, report?: boolean, electricity?: boolean) => {
    const {id = ''} = useParams();
    const navigate = useNavigate();

    const {isPending, mutate: operatorApproveAppeal} = useMutation({
        mutationFn: () => electricity ? ElectricityService.operatorApproveReport(id) : report ? InvestmentService.operatorApproveReport(id) : application ? ApplicationService.operatorApproveAppeal(id) : AppealService.operatorApproveAppeal(id),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {isPending, operatorApproveAppeal}
}

export default Index;