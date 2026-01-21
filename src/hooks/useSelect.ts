import {useQuery} from "@tanstack/react-query";
import {ISearchParams} from "@app/interfaces";
import {CommonService} from "@app/services";

export default function Index(type: string, params?: ISearchParams, enabled: boolean = true, id?: string) {
    const {isPending, data = [], refetch} = useQuery({
            queryKey: ["select", type, params, enabled, id],
            queryFn: () => CommonService.getSelectList(type, params, id),
            enabled
        }
    )

    return {isPending, data, refetch}
}
