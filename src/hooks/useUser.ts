import {useQuery} from "@tanstack/react-query";
import {buildUser} from "@app/shared";
import {AuthenticationService} from "@app/services";
import {IUserData} from "@app/interfaces";

export default function useUser() {
    const {isPending, data, status} = useQuery({
        queryKey: ["user"],
        queryFn: AuthenticationService.me,
    })

    return {isPending, user: buildUser({data: data?.data as IUserData}, status)}
}
