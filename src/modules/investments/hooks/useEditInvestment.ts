import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {InvestmentService} from "@app/services";
import {IAddInvestmentForm} from "@app/interfaces";

const useEditInvestment = (reset: () => void, applicationId?: string) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: editInvestment} = useMutation({
        mutationFn: (data: IAddInvestmentForm) => InvestmentService.editInvestment(data, id, applicationId),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate(-1);
            reset();
        }
    });

    return {isPending, editInvestment};
};

export default useEditInvestment;
