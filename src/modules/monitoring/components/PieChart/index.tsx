import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import styles from "./styles.module.scss"
import {centerTextPlugin, getStatusesLabels} from "@app/shared";
import {useTranslation} from "react-i18next";
import {FC} from "react";
import {ISelectOption} from "@app/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    layout: {
        padding: 5
    },
    rotation: 100,
    responsive: true,
    cutout: 60,
    plugins: {
        tooltip: {
            enabled: true,
            displayColors: false
        },
        legend: {
            display: false
        }
    }
}

interface IProperties {
    labels: ISelectOption[]
    data: (string | number)[]
    colors: string[]
}

const Index: FC<IProperties> = ({labels, data, colors}) => {
    const {t} = useTranslation()

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.wrapper}>
                    <Doughnut
                        data={{
                            labels: getStatusesLabels(t, labels),
                            datasets: [
                                {
                                    label: t("All"),
                                    data: data,
                                    backgroundColor: colors,
                                    borderWidth: 0,
                                }
                            ]
                        }}
                        options={options}
                        plugins={[centerTextPlugin(t)]}
                    />
                </div>
                <div className={styles.labels}>
                    {
                        getStatusesLabels(t, labels).map((item, index) => {
                            return (
                                <div className={styles.label}>
                                    <div className={styles.circle} style={{backgroundColor: colors[index]}}></div>
                                    <div className={styles.title}>
                                        {item}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Index;