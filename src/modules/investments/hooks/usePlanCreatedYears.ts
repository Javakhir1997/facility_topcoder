import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {InvestmentService} from "@app/services";

const usePlanCreatedYears = (enabled: boolean = true) => {
    const {id = ''} = useParams();

    const {isLoading: isPending, data: years} = useQuery({
        queryKey: ["plan-created-years", id],
        queryFn: () => InvestmentService.getPlanCreatedYears(id),
        enabled: !!id && enabled,
    });

    return {isPending, years};
};

export default usePlanCreatedYears;
