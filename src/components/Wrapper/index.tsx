import styles from './styles.module.scss';
import {FC, ReactNode} from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";

interface IProperties {
    children: ReactNode;
    screen?: boolean;
    title?: string;
    padding?: boolean;

}

const Index: FC<IProperties> = ({children, screen = false, padding = false, title = ''}) => {
    const {t} = useTranslation()
    return (
        <div className={classNames(styles.root, {[styles.screen]: screen, [styles.padding]: padding})}>
            {
                title ? <p className={styles.title}>{t(title)}</p> : null
            }
            {children}
        </div>
    );
};

export default Index;
