import styles from "./styles.module.scss";
import { FC } from "react";
import { ISelectOption } from "@app/interfaces";
import { useSearchParams } from "react-router-dom";
import { deleteKeysFromObject, getSearchParamsAsObject } from "@app/shared";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface IProperties {
  tabs: ISelectOption[];
  query: string;
  fallbackValue?: string | number;
}

const Index: FC<IProperties> = ({ tabs, fallbackValue, query }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchParams = getSearchParamsAsObject(searchParams);
  const { [query]: status = fallbackValue } = urlSearchParams;
  const { t } = useTranslation();

  const handleTabChange = (value: string | number) => {
    const filteredUrlSearchParams = deleteKeysFromObject(
      urlSearchParams,
      "page",
    );
    setSearchParams({ ...filteredUrlSearchParams, [query]: String(value) });
  };

  return (
    <div className={styles.root}>
      {tabs?.map((item) => {
        return (
          <div
            key={item.value}
            className={classNames(styles.tab, {
              [styles.active]: item.value === status,
            })}
            onClick={() => handleTabChange(item.value)}
          >
            {t(item.label as string)}
          </div>
        );
      })}
    </div>
  );
};

export default Index;
