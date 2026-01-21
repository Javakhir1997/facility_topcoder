import {ROLE_LIST} from "@app/shared";
import {IAuthentication, ILogin, IRole} from "@app/interfaces";

function buildUser(userData: ILogin | undefined, status: "error" | "success" | "pending" = "pending"): IAuthentication | null {
    if (status !== "success") return null
    if(!userData) return null
    return {
        id: userData?.data.id,
        fullName: `${userData?.data?.first_name} ${userData?.data?.last_name} `,
        role: userData?.data?.role ?? ROLE_LIST.APPLICANT
    }
}

const routeByRole = (role: IRole = ROLE_LIST.APPLICANT): string => {
    switch (role) {
        case ROLE_LIST.HEAD:
            return "/applications";
        case ROLE_LIST.APPLICANT:
        case ROLE_LIST.BALANCE:
        case ROLE_LIST.MINISTRY_DXSH_B_X:
        case ROLE_LIST.OPERATOR:
        case ROLE_LIST.REGION_OPERATOR:
        case ROLE_LIST.FINANCE_EMPLOYEE:
            return "/applications";
        default:
            return "/applications";
    }
}

export {
    buildUser,
    routeByRole
}
