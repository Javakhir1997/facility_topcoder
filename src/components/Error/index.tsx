import styles from "./styles.module.scss"
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation()
    return (
        <div className={styles.root}>
            <h1>{t('Oops! An error occurred. Please try again later.')}</h1>
        </div>
    )
}

export default Index;