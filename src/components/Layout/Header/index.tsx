import { Select } from "@components/UI";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { getSelectValue, languageOptions } from "@app/shared";
import { Instagram, Location, Phone, Telegram, Youtube } from "@app/assets";

const Index = () => {
  const { i18n, t } = useTranslation();
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {t("Ministry of Water Resources of the Republic of Uzbekistan")}
          </div>

          <div className="flex gap--lg">
            <div className={styles.location}>
              <Location />
              {t("Address MOF")}
            </div>

            <div className={styles.location}>
              <Phone />
              (71) 202-47-48
            </div>

            <div className="flex gap--md items-center">
              <a href="https://t.me/TGminwater" target="_blank">
                <Telegram />
              </a>

              <a
                href="https://www.instagram.com/suv_xojaligi_vazirligi/"
                target="_blank"
              >
                <Instagram />
              </a>

              <a
                href="https://www.youtube.com/channel/UC1La5moh4XmlvcMuqi1GZ8Q?view_as=subscriber"
                target="_blank"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>

        <Select
          id="language"
          type="language"
          options={languageOptions}
          isSearchable={false}
          placeholder="Select language"
          value={getSelectValue(languageOptions, i18n.language ?? "uzb")}
          defaultValue={getSelectValue(languageOptions, i18n.language ?? "uzb")}
          handleOnChange={(e) => i18n.changeLanguage((e ?? "uzb") as string)}
        />
      </div>
    </div>
  );
};

export default Index;
