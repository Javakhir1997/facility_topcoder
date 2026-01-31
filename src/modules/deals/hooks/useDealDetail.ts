import {useQuery} from "@tanstack/react-query";
import {AppealService, DealService} from "@app/services";
import {useParams} from "react-router-dom";

export default function Index(enabled: boolean = true) {
    const {id = ''} = useParams()
    console.log(id,'id ekan ')
    const {isPending, data} = useQuery({
            queryKey: ['deal-detail', id],
            queryFn: () => DealService.getDeal(id),
            enabled: !!id && enabled
        }
    )

    return {isPending, data}
}
