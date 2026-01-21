import styles from './styles.module.scss';
import {FC} from "react";
import {useTranslation} from "react-i18next";
import classNames from "classnames";

interface IProperties {
    label: string;
    value: string | undefined | null | number;
    background?: boolean;
}

const Index: FC<IProperties> = ({value, label, background = false}) => {
    const {t} = useTranslation()

    return (
        <div className={classNames(styles.root, {[styles.background]: background})}>
            <p className={styles.label}>
                {t(label)}
            </p>
            <p className={styles.value}>
                {value && value}
            </p>
        </div>
    );
};

export default Index;