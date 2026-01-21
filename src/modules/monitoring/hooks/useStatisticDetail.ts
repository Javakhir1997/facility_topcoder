import {useQuery} from "@tanstack/react-query";
import {DashboardService} from "@app/services";
import {useSearchParams} from "react-router-dom";
import {getSearchParamsAsObject} from "@app/shared";

const useStatisticDetail = (enabled: boolean = true) => {
    const [searchParams] = useSearchParams()
    const {year = '', region = ''} = getSearchParamsAsObject(searchParams)
    const {isLoading: isPending, data: statisticDetail} = useQuery({
        queryKey: ["common-statistic", year, region],
        queryFn: () => DashboardService.getCommonStatistics({
            year: year ? String(year) : new Date().getFullYear().toString(),
            region: region !== 'all' ? String(region) : "",
        }),
        enabled,
    });

    return {isPending, statisticDetail};
};

export default useStatisticDetail;
