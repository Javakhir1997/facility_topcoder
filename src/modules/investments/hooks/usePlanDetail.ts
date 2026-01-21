import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {InvestmentService} from "@app/services";

const usePlanDetail = (year: number | undefined | string, enabled: boolean = true) => {
    const {id = ''} = useParams();

    const {isLoading: isPending, data: planDetail} = useQuery({
        queryKey: ["plan-detail", id, year],
        queryFn: () => InvestmentService.getPlanDetail(id, year),
        enabled: !!id && !!year && enabled,
    });

    return {isPending, planDetail};
};

export default usePlanDetail;
