import {useQuery} from "@tanstack/react-query";
import {AppealService} from "@app/services";
import {useParams} from "react-router-dom";

export default function Index(enabled: boolean = true) {
    const {id = ''} = useParams()
    const {isPending, data} = useQuery({
            queryKey: ['application-detail', id],
            queryFn: () => AppealService.getAppeal(id),
            enabled: !!id && enabled
        }
    )

    return {isPending, data}
}
