import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {ElectricityService} from "@app/services";

export default function Index(enabled: boolean = true, objectId?: string | number | null) {
    const {id = ''} = useParams();
    const {isLoading: isPending, data} = useQuery({
        queryKey: ["application-duration-by-object-id", id],
        queryFn: () => ElectricityService.getApplicationDuration(objectId ? objectId : id),
        enabled: !!id && enabled,
    });

    return {isPending, starDate: data?.from_date, endDate: data?.to_date};
};
