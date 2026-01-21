import {useQuery} from "@tanstack/react-query";
import {InvestmentService} from "@app/services";
import {useAppContext, usePagination} from "@app/hooks";
import {getSearchParamsAsObject, ROLE_LIST} from "@app/shared";
import {useSearchParams} from "react-router-dom";

const useInvestments = () => {
    const {page, pageSize} = usePagination();
    const [searchParams] = useSearchParams();
    const {user} = useAppContext();
    const {tab = "new"} = getSearchParamsAsObject(searchParams);

    const {isPending, data} = useQuery({
        queryKey: ["investments", page, pageSize, tab],
        queryFn: () =>
            InvestmentService.getInvestments({
                page: String(page),
                pageSize: String(pageSize),
                st: [ROLE_LIST.OPERATOR].includes(user.role) ? tab !== 'new' ? 'plan_created' : tab : 'plan_created'
            }),
        enabled: Boolean(page && pageSize),
    });

    const investments = data?.results ?? [];
    const total = data?.count ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const currentPage = data?.currentPage ?? 1;

    return {isPending, investments, totalPages, total, currentPage};
};

export default useInvestments;