import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {InvestmentService} from "@app/services";

export default function Index(enabled: boolean = true, applicationId?: string | number | null) {

    const {id = ''} = useParams();

    const {isLoading: isPending, data} = useQuery({
        queryKey: ["application-duration", id],
        queryFn: () => InvestmentService.getApplicationDuration(applicationId ?? id),
        enabled: !!id && enabled,
    });

    return {isPending, starDate: data?.from_date, endDate: data?.to_date};
};
