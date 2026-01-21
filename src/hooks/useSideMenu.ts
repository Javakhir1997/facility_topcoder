import {useMemo} from "react";
import {IMenuItem, IRole} from "@app/interfaces";
import {useAppContext} from "@app/hooks";
import {menu} from "@app/configurations";

const pickOnlyAllowedMenu = (menuItem: IMenuItem, role: IRole) => menuItem.allowedRoles?.includes(role)
const sortMenu = (a: IMenuItem, b: IMenuItem, role: IRole) => a?.order?.[role] - b?.order?.[role]

export default function useSideMenu() {
    const {user} = useAppContext()

    return useMemo(() => {
            return user ?
                menu
                    .filter((menuItem) => pickOnlyAllowedMenu(menuItem, user.role))
                    .sort((a, b) => sortMenu(a, b, user.role)) :
                []
        },
        [user]
    )
}
