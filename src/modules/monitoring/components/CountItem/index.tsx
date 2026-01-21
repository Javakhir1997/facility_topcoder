import styles from "./styles.module.scss"
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

interface IProperties {
    title: string
    count: number |undefined
    icon: ReactNode
}

const Index: FC<IProperties> = ({icon, title, count}) => {
    const {t} = useTranslation()

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.count}>
                    {count ? count : 0}
                </div>
                <div className={styles.title}>
                    {t(title)}
                </div>
            </div>
        </div>
    );
};

export default Index;