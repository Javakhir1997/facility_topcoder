import {useQuery} from "@tanstack/react-query";
import {AnnouncementService} from "@app/services";
import {useParams} from "react-router-dom";

export default function Index(enabled: boolean = true) {
    const {id = ''} = useParams()
    const {isPending, data} = useQuery({
            queryKey: ['announcement-detail', id],
            queryFn: () => AnnouncementService.getAnnouncement(id),
            enabled: !!id && enabled
        }
    )

    return {isPending, data}
}
