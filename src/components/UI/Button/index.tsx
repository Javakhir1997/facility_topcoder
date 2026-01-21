import React from "react";
import classNames from "classnames";
import { BUTTON_THEME } from "@app/shared";
import { IButton } from "@app/interfaces";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Index: React.FC<IButton> = ({
  children,
  theme = BUTTON_THEME.PRIMARY,
  disabled,
  icon,
  mini = false,
  big = false,
  iconPosition = "left",
  navigate: redirect = "",
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      className={classNames(
        className,
        styles.button,
        { [styles[`mini`]]: mini },
        { [styles[`big`]]: big },
        { [styles[`button--disabled`]]: disabled },
        { [styles[`button--primary`]]: theme === BUTTON_THEME.PRIMARY },
        {
          [styles[`button--primary-outline`]]:
            theme === BUTTON_THEME.PRIMARY_OUTLINE,
        },
        { [styles[`button--danger`]]: theme === BUTTON_THEME.DANGER },
        {
          [styles[`button--danger-outline`]]:
            theme === BUTTON_THEME.DANGER_OUTLINE,
        },
        { [styles[`button--outline`]]: theme === BUTTON_THEME.OUTLINE },
        { [styles[`button--warning`]]: theme === BUTTON_THEME.WARNING },
        { [styles[`button--green`]]: theme === BUTTON_THEME.GREEN },
      )}
      disabled={disabled}
      onClick={() => !!redirect && navigate(redirect)}
      {...props}
    >
      {icon && (
        <span
          className={classNames(
            styles[`button__icon`],
            styles[`button__icon--${iconPosition}`],
          )}
        >
          {icon}
        </span>
      )}
      {t(children as string)}
    </button>
  );
};

export default Index;
