import {useQuery} from "@tanstack/react-query";
import {AuthenticationService} from "@app/services";

export default function useAccountsList(roles: string) {
    const {isPending, data, status} = useQuery({
        queryKey: ["accounts-list"],
        queryFn: () => AuthenticationService.getAccountsList(roles),
    })

    return {isPending, data, status}
}
