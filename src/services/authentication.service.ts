import {interceptor} from "@app/shared";
import {ILogin, ILoginForm, ISelectOption, IUserData} from "@app/interfaces";

export const AuthenticationService = {
    async login(credentials: ILoginForm) {
        const response = await interceptor.post<ILogin>('accounts/login', credentials)
        return response.data
    },

    async me() {
        return await interceptor.get<IUserData>('accounts/whoami')
    },

    async logout() {
        return await interceptor.post('accounts/logout')
    },

    async getAccountsList(roles: string) {
        const response = await interceptor.get<ISelectOption[]>(`accounts/select?role=${roles}`,)
        return response.data
    },
}
