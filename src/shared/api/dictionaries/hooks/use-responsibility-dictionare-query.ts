import {useQuery} from "@tanstack/react-query";
import {accountsApi} from "@shared/api/dictionaries/queries/account.api.ts";

export const useResponsibilitySelectQueries = () => {
    return useQuery({
        queryKey: ['accounts-select'],
        queryFn: () => accountsApi.list(),
        select: (data)=> data.map((item)=> {
            return {
                id: item.value,
                name: item.label,
            }
        })
    });
};
