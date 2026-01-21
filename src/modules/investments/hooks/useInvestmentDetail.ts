import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {InvestmentService} from "@app/services";

const useInvestmentDetail = (enabled: boolean = true) => {
    const {id = ''} = useParams()

    const {isLoading: isPending, data} = useQuery({
        queryKey: ["investment-detail", id],
        queryFn: () => InvestmentService.getInvestmentDetail(id),
        enabled: !!id && enabled,
    });

    return {isPending, data}
}

export default useInvestmentDetail;
