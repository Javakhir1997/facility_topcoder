import {useAppContext} from "@app/hooks";
import {IRole} from "@app/interfaces";
import {FC, ReactNode} from "react";

interface IProperties {
    permittedRole: IRole | IRole[];
    children: ReactNode;
}

const Index: FC<IProperties> = ({permittedRole, children}) => {
    const {user} = useAppContext();
    const isAllowedTo = Array.isArray(permittedRole)
        ? permittedRole.includes(user.role)
        : permittedRole === user.role;
    return isAllowedTo ? children : null;
};

export default Index;
