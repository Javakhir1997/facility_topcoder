import {useStatus} from "@app/hooks";
import {FC} from "react";
import {STATUS_COLOR_LIST, STATUS_LIST} from "@app/shared";
import styles from "./styles.module.scss"

interface Properties {
    status?: keyof typeof STATUS_LIST | string;
    count: number;
}

const Index: FC<Properties> = ({status, count}) => {
    const {color} = useStatus(status as keyof typeof STATUS_COLOR_LIST)

    return (
        <div
            className={styles.root}
            style={{background: color}}
        >
            {count}
        </div>
    )
}

export default Index;