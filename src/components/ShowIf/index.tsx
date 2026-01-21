import {FC, ReactNode} from "react";

interface IProperties {
    show: boolean;
    children: ReactNode;
}

const Index: FC<IProperties> = ({show, children}) => {
    return show ? children : null;
};

export default Index;
