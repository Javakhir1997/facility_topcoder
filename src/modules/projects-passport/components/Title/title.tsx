import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface IProperties {
  children?: ReactNode;
  title: string;
}

const Title: FC<IProperties> = ({ children, title }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1
        style={{
          fontFamily: "Golos-SemiBold",
          fontWeight: 800,
          fontStyle:"normal",
        }}
      >
        {t(title)}
      </h1>
      {children ?? null}
    </div>
  );
};

export default Title;
