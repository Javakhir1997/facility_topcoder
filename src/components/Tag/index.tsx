import {CSSProperties, FC, ReactNode} from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import {useTranslation} from "react-i18next";

interface IProperties {
    title: string;
    type?: 'vertical' | 'horizontal';
    string?: boolean;
    bold?: boolean;
    className?: CSSProperties | string;
    children?: ReactNode;
}

const Index: FC<IProperties> = ({
                                    title,
                                    children,
                                    type = 'horizontal',
                                    string = false,
                                    bold = false,
                                    className = '',
                                }) => {
    const {t} = useTranslation()
    return (
        <div className={classNames(styles.root, className, {
            [styles.vertical]: type === 'vertical',
            [styles.bold]: bold,
        })}>
            <p className={styles.title}>{t(title)}{type === 'horizontal' ? ':' : null}</p>
            {
                !string ? children :
                    <div className={styles.children}>
                        {children}
                    </div>
            }
        </div>
    );
};

export default Index;