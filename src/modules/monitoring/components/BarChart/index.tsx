import {Bar} from "react-chartjs-2";
import styles from "./styles.module.scss"
import {useTranslation} from "react-i18next";
import {FC} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        bar: {
            borderRadius: 2
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                maxRotation: 0,
                fontColor: "#999999",
                fontStyle: "normal",
                fontFamily: "Inter-Regular, serif",
                lineHeight: "1rem",
                fontSize: "0.75rem",
            },
        },
        y: {
            beginAtZero: true,
            border: {
                display: false,
            },
            ticks: {
                maxTicksLimit: 6,
                fontColor: "#999999",
                fontStyle: "normal",
                fontFamily: "Inter-Regular, serif",
                lineHeight: "1rem",
                fontSize: "0.75rem",
            },
            grid: {
                drawTicks: false,
            },
        },
    },
    plugins: {
        tooltip: {
            enabled: true,
            displayColors: false,
        },
        legend: {
            display: false,
        }
    }
}

interface IProperties {
    labels: string[]
    colors: string[]
}

const Index: FC<IProperties> = ({labels, colors}) => {
    const {t, i18n} = useTranslation()

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.wrapper}>
                    <Bar
                        data={{
                            labels: i18n.language === "uz" ? [
                                "Yanvar",
                                "Fevral",
                                "Mart",
                                "Aprel",
                                "May",
                                "Iyun",
                                "Iyul",
                                "Avgust",
                                "Sentyabr",
                                "Oktyabr",
                                "Noyabr",
                                "Dekabr",
                            ] : [
                                "Январь",
                                "Февраль",
                                "Март",
                                "Апрель",
                                "Май",
                                "Июнь",
                                "Июль",
                                "Август",
                                "Сентябрь",
                                "Октябрь",
                                "Ноябрь",
                                "Декабрь",
                            ],
                            datasets: [
                                {
                                    label: t("All"),
                                    data: [17, 44, 67, 26, 81, 86, 21, 89, 86, 12, 54, 6],
                                    backgroundColor: '#66C8FF',
                                    borderWidth: 0
                                },
                                {
                                    label: t("All"),
                                    data: [81, 59, 15, 64, 55, 63, 26, 4, 75, 100, 6, 69],
                                    backgroundColor: '#4476F4',
                                    borderWidth: 0
                                }
                            ]
                        }}
                        options={options}
                    />
                </div>
                <div className={styles.labels}>
                    {
                        labels.map((item, index) => {
                            return (
                                <div className={styles.label}>
                                    <div className={styles.circle} style={{backgroundColor: colors[index]}}></div>
                                    <div className={styles.title}>
                                        {t(item)}
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