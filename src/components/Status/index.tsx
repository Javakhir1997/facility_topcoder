import { FC } from "react";
import { useStatus } from "@app/hooks";
import { useTranslation } from "react-i18next";
import { STATUS_COLOR_LIST, STATUS_LABEL, STATUS_LIST } from "@app/shared";

import styles from "./styles.module.scss";

interface Properties {
  status: keyof typeof STATUS_LIST | string;
}

const Index: FC<Properties> = ({ status }) => {
  const { t } = useTranslation();
  const { background, color } = useStatus(
    status as keyof typeof STATUS_COLOR_LIST,
  );

  return (
    <div className={styles.root} style={{ background, color }}>
      {t(`statuses.${STATUS_LABEL[status]}`)}
    </div>
  );
};

export default Index;
