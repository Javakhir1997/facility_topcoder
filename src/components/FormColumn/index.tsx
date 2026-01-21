import styles from "./styles.module.scss";
import {FC, HTMLAttributes, ReactNode} from "react";

interface IProperties extends HTMLAttributes<HTMLFormElement> {
    children: ReactNode
}

const Index: FC<IProperties> = ({onSubmit, children, ...rest}) => {
    return (
        <form className={styles.root} {...rest} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Index;
