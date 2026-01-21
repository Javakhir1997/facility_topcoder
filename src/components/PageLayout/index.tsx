import styles from './styles.module.scss';
import {FC, ReactNode} from "react";

interface IProperties {
    children?: ReactNode;
}

const Index: FC<IProperties> = ({children}) => {
    return (
        <div className={styles.root}>
            {children ?? null}
        </div>
    );
};

export default Index;