import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {ElectricityService} from "@app/services";

const useReportDetail = (enabled: boolean = true) => {
    const {id = ''} = useParams();

    const {isLoading: isPending, data} = useQuery({
        queryKey: ["report-detail", "electricity", id],
        queryFn: () => ElectricityService.getReportDetail(id),
        enabled: !!id && enabled,
    });

    return {isPending, data};
};

export default useReportDetail;
