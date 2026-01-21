import {useQuery} from "@tanstack/react-query";
import {ApplicationService} from "@app/services";
import {useParams} from "react-router-dom";

export default function Index(enabled: boolean = true, applicationId?: string | number | null) {
    const {id = ''} = useParams()
    const {isPending, data} = useQuery({
            queryKey: ["application-detail", id],
            queryFn: () => ApplicationService.getApplication(applicationId ?? id),
            enabled: !!id && enabled
        }
    )

    return {isPending, data}
}
