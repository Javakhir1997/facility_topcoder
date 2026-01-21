import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {ElectricityService} from "@app/services";

const usePlanDetail = (year: number | undefined | string, enabled: boolean = true) => {
    const {id = ''} = useParams();

    const {isLoading: isPending, data: planDetail} = useQuery({
        queryKey: ["plan-detail", "electricity", id, year],
        queryFn: () => ElectricityService.getPlanDetail(id, year),
        enabled: !!id && !!year && enabled,
    });

    return {isPending, planDetail};
};

export default usePlanDetail;
