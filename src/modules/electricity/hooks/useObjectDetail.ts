import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {ElectricityService} from "@app/services";
import {usePagination} from "@app/hooks";

const useObjectDetail = (enabled: boolean = true) => {
    const {id = ''} = useParams()
    const {page, pageSize} = usePagination()

    const {isLoading: isPending, data} = useQuery({
        queryKey: ["objects-detail", id, pageSize, page, enabled],
        queryFn: () => ElectricityService.getObjectDetail({
            page: String(page),
            pageSize: String(pageSize),
        }, id),
        enabled: !!id && enabled,
    });


    const plans = data?.results ?? [];
    const total = data?.count ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const currentPage = data?.currentPage ?? 1;

    return {isPending, plans, totalPages, total, currentPage};
}

export default useObjectDetail;
