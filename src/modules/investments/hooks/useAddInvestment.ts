import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {InvestmentService} from "@app/services";
import {IAddInvestmentForm} from "@app/interfaces";

const useAddInvestment = (reset: () => void) => {
    const {id = ''} = useParams();

    const {isPending, mutate: addInvestment} = useMutation({
        mutationFn: (data: IAddInvestmentForm) => InvestmentService.addInvestment(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            reset();
        }
    });

    return {isPending, addInvestment};
};

export default useAddInvestment;
