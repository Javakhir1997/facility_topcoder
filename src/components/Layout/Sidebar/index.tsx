import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext, useLogout, useSideMenu } from "@app/hooks";
import { ROLE_LABEL } from "@app/shared";
import { Logout, Status } from "@app/assets";
import styles from "./styles.module.scss";
import SidebarItem from "./SidebarItem";
import classNames from "classnames";

const Index: FC = () => {
  const { t } = useTranslation();
  const { user } = useAppContext();
  const sideMenu = useSideMenu();
  const { handleLogout, isPending } = useLogout();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/logo.png" alt="Logo" />
        <p>{t("Water management facilities")}</p>
      </div>

      <div className={styles.hr}></div>

      <ul className={styles.menu}>
        {sideMenu?.map((item) => (
          <li key={item?.id}>
            <SidebarItem {...item} />
          </li>
        ))}
      </ul>

      <div
        className={classNames(styles.logout, { [styles.isLoading]: isPending })}
        onClick={() => handleLogout()}
      >
        <Logout />
        <span className={styles.title}>{t("Logout")}</span>
      </div>

      <div className={styles.dash}></div>

      <div className={styles.profile}>
        <div className={styles.status}>
          <Status />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.name}>{user?.fullName}</div>
          <div className={styles.role}>{t(ROLE_LABEL[user.role])}</div>
        </div>
      </div>
    </aside>
  );
};

export default Index;
