import {ILogin} from "@app/interfaces";
import {useMutation} from "@tanstack/react-query";
import {SignatureService} from "@app/services";
import {routeByRole, showMessage} from "@app/shared";
import {useLocation, useNavigate} from "react-router-dom";

export function useSignature() {
    const navigate = useNavigate()
    const {state} = useLocation()

    const handleLogin = (userData: ILogin) => {
        if (state?.from !== '/' && state?.from) navigate(state?.from || routeByRole(userData?.data?.role))
        else navigate(routeByRole(userData?.data?.role))
        showMessage('Successfully', 'success')
    }

    const {isPending, mutate: handleSignature} = useMutation({
        mutationFn: (credentials: string) => SignatureService.login(credentials),
        onSuccess: handleLogin,
    })

    return {handleSignature, isPending}
}
