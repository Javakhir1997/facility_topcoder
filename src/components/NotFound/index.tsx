import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import styles from "@components/Error/styles.module.scss"
import {Button} from "@app/components";

const Index = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <div className={styles.root}>
            <h1>{t('404 - Page not found')}</h1>
            <div className='flex gap--lg'>
                <Button onClick={() => navigate("/", {replace: true})}>
                    {t("Home page")}
                </Button>
                <Button onClick={() => navigate(-1)}>
                    {t("Back")}
                </Button>
            </div>
        </div>
    )
}

export default Index;