import {useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {routeByRole, showMessage} from "@app/shared";
import {ILogin, ILoginForm} from "@app/interfaces";
import {AuthenticationService} from "@app/services";

export function useLogin() {
    const {state} = useLocation()
    const navigate = useNavigate()

    const handleLogin = (userData: ILogin) => {
        if (state?.from !== '/' && state?.from) navigate(state?.from || routeByRole(userData?.data?.role))
        else navigate(routeByRole(userData?.data?.role))
        showMessage('Successfully', 'success')
    }

    const {isPending, mutate: login} = useMutation({
        mutationFn: (credentials: ILoginForm) => AuthenticationService.login(credentials),
        onSuccess: handleLogin,
    })

    return {login, isPending}
}
